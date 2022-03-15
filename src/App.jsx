import React from 'react';
import Login from './Login';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Register from './Register';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <HashRouter>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
