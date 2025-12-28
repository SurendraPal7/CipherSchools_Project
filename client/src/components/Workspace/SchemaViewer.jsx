import React from 'react';

const SchemaViewer = ({ tables }) => {
    if (!tables || tables.length === 0) return null;

    return (
        <div className="schema-viewer">
            <h3>Database Schema</h3>
            {tables.map((table, idx) => (
                <div key={idx} className="table-schema">
                    <h4>{table.tableName}</h4>
                    <ul>
                        {table.columns.map((col, cIdx) => (
                            <li key={cIdx}>
                                <strong>{col.columnName}</strong> <span>({col.dataType})</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default SchemaViewer;
