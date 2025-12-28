import React from 'react';

const ResultsPanel = ({ results, error }) => {
    if (error) {
        return <div className="results-panel error">Error: {error}</div>;
    }

    if (!results || !results.rows || results.rows.length === 0) {
        return <div className="results-panel empty">No results to display</div>;
    }

    return (
        <div className="results-panel">
            <table>
                <thead>
                    <tr>
                        {results.fields.map((field) => (
                            <th key={field}>{field}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {results.rows.map((row, i) => (
                        <tr key={i}>
                            {results.fields.map((field) => (
                                <td key={field}>{row[field]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsPanel;
