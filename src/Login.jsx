import React, { useEffect, useState } from 'react';

let Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // changing document title
  useEffect(() => {
    document.title = 'Login - eCommerce';
  }, []);

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
