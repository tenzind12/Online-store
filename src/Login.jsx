import React, { useEffect, useState } from 'react';

let Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dirty, setDirty] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: [], password: [] });

  // changing document title
  useEffect(() => {
    document.title = 'Login - eCommerce';
  }, []);

  const validate = () => {
    const errorData = {};

    // E M A I L  V A L I D A T I O N
    errorData.email = [];
    if (!email) {
      errorData.email.push('Email cannot be blank');
    }
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*0;/;
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
    setErrors({ errorData });
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
                onBlur={(e) => {
                  setDirty({ ...dirty, [e.target.name]: true });
                  validate();
                }}
                placeholder="Email"
              />
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
                onBlur={(e) => {
                  setDirty({ ...dirty, [e.target.name]: true });
                  validate();
                }}
              />
            </div>
            {/* password ends  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
