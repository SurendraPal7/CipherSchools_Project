import express from 'express';
const router = express.Router();
import Assignment from '../models/Assignment.js';

router.get('/', async (req, res) => {
    try {
        const assignments = await Assignment.find().select('title difficulty description');
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
        res.json(assignment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
