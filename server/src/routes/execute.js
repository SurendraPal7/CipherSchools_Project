import express from 'express';
const router = express.Router();
import sqlite3 from 'sqlite3';
const { verbose } = sqlite3;
const sqliteVerbose = verbose();
import Assignment from '../models/Assignment.js';
import UserProgress from '../models/UserProgress.js';

router.post('/', async (req, res) => {
    const { query, assignmentId, userId = 'anonymous' } = req.body;

    if (!query) return res.status(400).json({ error: 'Query is required' });
    if (!assignmentId) return res.status(400).json({ error: 'Assignment ID is required' });

    if (/drop|delete|insert|update|alter|truncate/i.test(query)) {
        return res.status(403).json({ error: 'Only SELECT queries are allowed.' });
    }

    try {
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

        const db = new sqliteVerbose.Database(':memory:');

        db.serialize(() => {
            assignment.sampleTables.forEach(table => {
                const columnsDef = table.columns.map(c => `${c.columnName} ${c.dataType}`).join(', ');
                db.run(`CREATE TABLE ${table.tableName} (${columnsDef})`);

                const placeholders = table.columns.map(() => '?').join(', ');
                const stmt = db.prepare(`INSERT INTO ${table.tableName} VALUES (${placeholders})`);

                table.rows.forEach(row => {
                    const values = table.columns.map(c => row[c.columnName]);
                    stmt.run(values);
                });
                stmt.finalize();
            });

            db.all(query, [], async (err, rows) => {
                try {
                    await UserProgress.create({
                        userId: userId,
                        assignmentId: assignmentId,
                        sqlQuery: query,
                        isCompleted: !err && rows.length > 0,
                        attemptCount: 1
                    });
                    console.log('Query logged to UserProgress');
                } catch (logErr) {
                    console.error('Failed to log user progress:', logErr.message);
                }

                if (err) {
                    res.status(400).json({ error: err.message });
                } else {
                    const fields = rows.length > 0 ? Object.keys(rows[0]) : [];
                    res.json({ rows, fields });
                }

                db.close();
            });
        });

    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

export default router;
