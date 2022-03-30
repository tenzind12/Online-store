import React, { useReducer } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Navbar from './components/Navbar';
import Store from './pages/Store';
import ProductsList from './components/ProductsList';

// state reducer
const initialUser = {
  isLoggedIn: false,
  currentUserId: null,
  currentUserName: null,
  currentUserRole: null,
};

// operation reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        isLoggedIn: true,
        currentUserId: action.payload.currentUserId,
        currentUserName: action.payload.currentUserName,
        currentUserRole: action.payload.currentUserRole,
      };
    case 'logout':
      return {
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
        currentUserRole: null,
      };
    default:
      return state;
  }
};

function App() {
  // useReducer: state + operations
  const [user, dispatch] = useReducer(reducer, initialUser);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <HashRouter>
        <Navbar />
        <div className="container-fluid">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/store" element={<Store />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
