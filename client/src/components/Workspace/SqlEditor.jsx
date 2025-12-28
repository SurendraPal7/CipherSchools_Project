import React from 'react';
import Editor from '@monaco-editor/react';

const SqlEditor = ({ value, onChange }) => {
    return (
        <div className="sql-editor-container">
            <Editor
                height="100%"
                defaultLanguage="sql"
                theme="vs-dark"
                value={value}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'Fira Code', Consolas, monospace",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16 }
                }}
            />
        </div>
    );
};

export default SqlEditor;
