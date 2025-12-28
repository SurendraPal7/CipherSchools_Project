import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const hint = "Here is a hint: Try selecting all columns first.";
        res.json({ hint });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
