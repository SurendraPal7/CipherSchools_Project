import React, { useState } from 'react';
import axios from 'axios';

const QuestionPanel = ({ assignment, onGetHint }) => {
    const [hint, setHint] = useState(null);
    const [loadingHint, setLoadingHint] = useState(false);

    const handleGetHint = async () => {
        setLoadingHint(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/hint`, {
                question: assignment.question,
                schema: assignment.sampleTables
            });
            setHint(res.data.hint);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingHint(false);
        }
    };

    return (
        <div className="question-panel">
            <h2>{assignment.title}</h2>
            <p>{assignment.description}</p>
            <div className="question-box">
                <strong>Task:</strong> {assignment.question}
            </div>

            <div className="actions">
                <button
                    onClick={handleGetHint}
                    className="btn-secondary"
                    disabled={loadingHint}
                >
                    {loadingHint ? 'Thinking...' : 'Get Hint 💡'}
                </button>
            </div>

            {hint && (
                <div className="hint-box">
                    <strong>Hint:</strong> {hint}
                </div>
            )}
        </div>
    );
};

export default QuestionPanel;
