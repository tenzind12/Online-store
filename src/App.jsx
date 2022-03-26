import React, { useState } from 'react';
import Login from './Login';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Register from './Register';
import PageNotFound from './PageNotFound';
import Navbar from './Navbar';
import { UserContext } from './UserContext';
import Store from './Store';

function App() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    currentUserId: null,
    currentUserName: null,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <HashRouter>
        <Navbar />
        <div className="container-fluid">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/store" element={<Store />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </div>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
