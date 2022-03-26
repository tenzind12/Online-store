import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';

function Navbar() {
  const userContext = useContext(UserContext);

  const onLogoutClick = () => {
    userContext.setUser({ isLoggedIn: false, currentUserName: null, currentUserId: null });
    window.location.hash = '/';
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-style">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            eCommerce
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* display when logged in */}
              {userContext.user.isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                    to="/dashboard"
                  >
                    <i className="fa fa-dashboard" /> Dashboard
                  </NavLink>
                </li>
              )}

              {userContext.user.isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                    to="/store"
                  >
                    <i className="fa fa-shopping-bag" /> Store
                  </NavLink>
                </li>
              )}

              {/* display only when not logged in */}
              {!userContext.user.isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              )}

              {/* display only when not logged in */}
              {!userContext.user.isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              )}
            </ul>

            {/* display when logged in */}
            {userContext.user.isLoggedIn && (
              <div style={{ marginRight: 100 }}>
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-user" />
                      {userContext.user.currentUserName[0].toUpperCase() +
                        userContext.user.currentUserName.slice(1)}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <a className="dropdown-item" to="/#" onClick={onLogoutClick}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
