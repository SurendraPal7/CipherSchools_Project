import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SqlEditor from './SqlEditor';
import ResultsPanel from './ResultsPanel';
import QuestionPanel from './QuestionPanel';
import SchemaViewer from './SchemaViewer';
import '../../styles/Workspace.scss';

const Workspace = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [executing, setExecuting] = useState(false);

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/assignments/${id}`);
                setAssignment(res.data);
                setAssignment(res.data);
                setQuery(`SELECT * FROM ${res.data.sampleTables[0].tableName} LIMIT 5;`);
            } catch (err) {
                console.error("Failed to load assignment", err);
            }
        };
        fetchAssignment();
    }, [id]);

    const handleExecute = async () => {
        setExecuting(true);
        setError(null);
        setResults(null);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/execute`, {
                query,
                assignmentId: assignment._id
            });
            setResults(res.data);
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setExecuting(false);
        }
    };

    if (!assignment) return <div className="loading">Loading Workspace...</div>;

    return (
        <div className="workspace container">
            <button onClick={() => navigate('/')} className="btn-secondary back-btn">
                ← Back to Assignments
            </button>

            <div className="workspace-grid">
                <div className="left-panel">
                    <QuestionPanel assignment={assignment} />
                    <SchemaViewer tables={assignment.sampleTables} />
                </div>

                <div className="right-panel">
                    <div className="editor-section">
                        <div className="editor-header">
                            <h3>SQL Editor</h3>
                            <button
                                className="btn-primary"
                                onClick={handleExecute}
                                disabled={executing}
                            >
                                {executing ? 'Running...' : 'Run Query ▶'}
                            </button>
                        </div>
                        <SqlEditor value={query} onChange={setQuery} />
                    </div>

                    <div className="results-container">
                        <h3>Query Results</h3>
                        <ResultsPanel results={results} error={error} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Workspace;
