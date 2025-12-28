import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AssignmentList from './components/AssignmentList';
import Workspace from './components/Workspace/Workspace';

function App() {
  return (
    <Router>
      <div className="app">
        <header style={{ padding: '1rem 2rem', background: '#2d3436', borderBottom: '1px solid #444', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#00cec9', margin: 0 }}>CipherSQLStudio</h2>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<AssignmentList />} />
            <Route path="/assignment/:id" element={<Workspace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
