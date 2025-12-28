import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AssignmentList.scss';

const AssignmentList = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/assignments`);
                setAssignments(res.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching assignments:', err);
                setError('Failed to connect to the server. Please check if the backend is running and database is connected.');
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    if (loading) return <div className="loading">Loading assignments...</div>;

    if (error) return (
        <div className="assignment-list container">
            <h1>Select an Assignment</h1>
            <div className="error-message" style={{ color: '#ff7675', textAlign: 'center', padding: '2rem', background: 'rgba(255,118,117,0.1)', borderRadius: '8px' }}>
                <h3>Connection Error</h3>
                <p>{error}</p>
            </div>
        </div>
    );

    return (
        <div className="assignment-list container">
            <h1>Select an Assignment</h1>
            {assignments.length === 0 ? (
                <div className="empty-state" style={{ textAlign: 'center', color: '#b0bec5', padding: '2rem' }}>
                    <h3>No Assignments Found</h3>
                    <p>The database appears to be empty. Please run the seed script.</p>
                </div>
            ) : (
                <div className="grid">
                    {assignments.map((assignment) => (
                        <div
                            key={assignment._id}
                            className={`card ${assignment.difficulty.toLowerCase()}`}
                            onClick={() => navigate(`/assignment/${assignment._id}`)}
                        >
                            <h2>{assignment.title}</h2>
                            <span className="badge">{assignment.difficulty}</span>
                            <p>{assignment.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div >
    );
};

export default AssignmentList;
