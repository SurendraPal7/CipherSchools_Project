import express from 'express';
import cors from 'cors';
import { connectMongo } from './config/db.js';
import dotenv from 'dotenv';
import assignmentsRouter from './routes/assignments.js';
import executeRouter from './routes/execute.js';
import hintRouter from './routes/hint.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/assignments', assignmentsRouter);
app.use('/api/execute', executeRouter);
app.use('/api/hint', hintRouter);

app.get('/', (req, res) => {
    res.send('CipherSQLStudio API Running');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectMongo();
    if (process.env.NODE_ENV !== 'production') {
        app.listen(PORT, () => {
            console.log(`\n!!! SERVER RUNNING WITH SQLITE (NO PASSWORD) ON PORT ${PORT} !!!\n`);
        });
    }
};

startServer();

export default app;
