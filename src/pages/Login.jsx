import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

let Login = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const emailInputRef = useRef();

  console.log(emailInputRef);

  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('Admin123');
  const [dirty, setDirty] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: [], password: [] });
  const [loginMsg, setLoginMsg] = useState('');
  // changing document title
  useEffect(() => {
    document.title = 'Login - eCommerce';
    emailInputRef.current.focus();
  }, []);

  const validate = () => {
    const errorData = {};

    // E M A I L  V A L I D A T I O N
    errorData.email = [];
    if (!email) {
      errorData.email.push('Email cannot be blank');
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email) {
      if (!emailRegex.test(email)) {
        errorData.email.push('Email format is not accepted');
      }
    }

    // P A S S W O R D  V A L I D A T I O N
    errorData.password = [];
    if (!password) {
      errorData.password.push('Password cannot be blank');
    }
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
    if (password) {
      if (!passwordRegex.test(password)) {
        errorData.password.push(
          'Password should be 6 - 15 characters long with at least one uppercase letter, one lowercase letter and one digit'
        );
      }
    }
    setErrors(errorData);
  };

  useEffect(validate, [email, password]);

  // O N  L O G I N  C L I C K
  const onLoginClick = async () => {
    const dirtyData = dirty;
    Object.keys(dirty).forEach((field) => {
      dirtyData[field] = true;
    });
    setDirty(dirtyData);

    // call validate
    validate();

    // only when there is no errors at all, we make http request
    if (isValid()) {
      const response = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}`,
        { method: 'GET' }
      );
      if (response.ok) {
        const responseBody = await response.json();
        if (responseBody.length > 0) {
          // setting global state context and reducer/dispatch
          userContext.dispatch({
            type: 'login',
            payload: {
              currentUserId: responseBody[0].id,
              currentUserName: responseBody[0].fullName,
              currentUserRole: responseBody[0].role,
            },
          });

          // redirect using useNavigate() according to user role
          if (responseBody[0].role === 'user') {
            navigate('/dashboard');
          } else {
            navigate('/products');
          }
        } else {
          setLoginMsg(<span className="text-danger">Invalid login credentials</span>);
        }
      } else {
        setLoginMsg(<span className="text-danger">Server problem</span>);
      }
    }
  };

  const isValid = () => {
    let valid = true;
    for (let field in errors) {
      if (errors[field].length > 0) {
        valid = false;
      }
    }
    return valid;
  };

  return (
    <div className="row">
      <div className="col-lg-5 col-md-7 mx-auto">
        <div className="card border-success shadow-lg my-2">
          <div className="card-header border-bottom border-success">
            <h4 style={{ fontSize: '40px' }} className="text-success text-center">
              Login
            </h4>
          </div>

          <div className="card-body border-bottom border-success">
            {/* email starts */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                onBlur={() => {
                  setDirty({ ...dirty, email: true });
                  validate();
                }}
                placeholder="Email"
                ref={emailInputRef}
              />
              <div className="text-danger">
                {dirty['email'] && errors['email'][0] ? errors['email'] : ''}
              </div>
            </div>
            {/* email ends  */}

            {/* password starts */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onBlur={() => {
                  setDirty({ ...dirty, password: true });
                  validate();
                }}
              />
              <div className="text-danger">
                {dirty['password'] && errors['password'][0] ? errors['password'] : ''}
              </div>
            </div>
            {/* password ends  */}
          </div>
          <div className="card-footer text-center">
            <div className="m-1">{loginMsg}</div>
            <button className="btn btn-success m-2" onClick={onLoginClick} type="button">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
