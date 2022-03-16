import { useEffect, useState } from 'react';

function Register() {
  const [state, setState] = useState({
    email: '',
    password: '',
    fullname: '',
    gender: '',
    dob: '',
    country: '',
    receiveNewsLetter: '',
  });

  const [countries] = useState([
    { id: 1, countryName: 'France' },
    { id: 2, countryName: 'Germnay' },
    { id: 3, countryName: 'Japan' },
    { id: 4, countryName: 'UK' },
  ]);

  const [errors, setErrors] = useState({
    email: [],
    password: [],
    fullname: [],
    dob: [],
    gender: [],
    country: [],
    receiveNewsLetter: [],
  });

  // is in process of filling field
  const [dirty, setDirty] = useState({
    email: false,
    password: false,
    fullname: false,
    gender: false,
    dob: false,
    country: false,
    receiveNewsLetter: false,
  });

  const [message, setMessage] = useState('');

  // V A L I D A T I O N  M E T H O D
  const validate = () => {
    let errorData = {};

    /* E M A I L */
    errorData.email = [];
    // blank email
    if (!state.email) errorData.email.push('Email cannot be blank');
    if (state.email) {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(state.email)) {
        errorData.email.push('Email format is not accepted');
      }
    }

    /*  P A S S W O R D */
    errorData.password = [];
    // blank password
    if (!state.password) errorData.password.push('Password cannot be blank');
    if (state.password) {
      const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
      if (!passwordRegex.test(state.password)) {
        errorData.password.push(
          'Password should be 6 - 15 characters long with at least one uppercase letter, one lowercase letter and one digit'
        );
      }
    }

    /*  F U L L N A M E */
    errorData.fullname = [];
    // blank fullname
    if (!state.fullname) errorData.fullname.push('Full Name cannot be blank');
    setErrors(errorData);

    /*  D O B */
    errorData.dob = [];
    // blank dob
    if (!state.dob) errorData.dob.push('Date of Birth cannot be blank');

    /*  C O U N T R Y */
    errorData.country = [];
    // blank country
    if (!state.country) errorData.country.push('Country cannot be blank');

    setErrors(errorData);
  };

  useEffect(() => {
    validate();
  }, [state]);

  // changing document title
  useEffect(() => {
    document.title = 'Register - eCommerce';
  }, []);

  const onRegisterClick = () => {
    // setting every fieled to dirty
    let dirtyData = dirty;
    Object.keys(dirty).forEach((field) => {
      dirtyData[field] = true;
    });
    setDirty(dirtyData);

    validate();
  };

  return (
    <div className="row">
      <div className="col-lg-6 col-md-7 mx-auto">
        <div className="card border-primary shadow my-2">
          <div className="card-header border-bottom border-primary">
            <h4 style={{ fontSize: '40px' }} className="text-primary">
              Register
            </h4>
            {/* error messages */}
            <ul className="text-danger">
              {Object.keys(errors).map((field) => {
                if (dirty[field]) {
                  return errors[field].map((err) => {
                    return <li key={err}>{err}</li>;
                  });
                }
                return '';
              })}
            </ul>
          </div>
          <div className="card-body border-bottom ">
            {/* email */}
            <div className="form-group mb-3 d-md-flex">
              <label className="col-md-4" htmlFor="email">
                Email
              </label>
              <div className="col-md-8 ">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={state.email}
                  onChange={(e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                  }}
                />
              </div>
            </div>
            {/* email ends */}

            {/* password */}
            <div className="form-group mb-3 d-md-flex">
              <label className="col-md-4" htmlFor="password">
                Password
              </label>
              <div className="col-md-8 ">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={state.password}
                  onChange={(e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                  }}
                />
              </div>
            </div>
            {/* password ends */}

            {/* Full name */}
            <div className="form-group mb-3 d-md-flex">
              <label className="col-md-4" htmlFor="fullname">
                Full name
              </label>
              <div className="col-md-8 ">
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="form-control"
                  value={state.fullname}
                  onChange={(e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                  }}
                />
              </div>
            </div>
            {/* Full name ends */}

            {/* DOB */}
            <div className="form-group mb-3 d-md-flex">
              <label className="col-md-4" htmlFor="dob">
                DOB
              </label>
              <div className="col-md-8 ">
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="form-control"
                  value={state.dob}
                  onChange={(e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                  }}
                />
              </div>
            </div>
            {/* DOB ends */}

            {/* Gender */}
            <div className="form-group mb-3 d-md-flex">
              <label className="col-md-4">Gender</label>
              <div className="col-md-8 ">
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    className="form-check-input"
                    checked={state.gender === 'male' ? true : false}
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.value });
                    }}
                  />
                </div>
                <label className="form-check-inline" htmlFor="male">
                  Male
                </label>

                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    className="form-check-input"
                    checked={state.gender === 'female' ? true : false}
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.value });
                    }}
                  />
                </div>
                <label className="form-check-inline" htmlFor="female">
                  Female
                </label>
              </div>
            </div>
            {/* Gender ends */}

            {/* Country */}
            <div className="form-group mb-3 d-md-flex">
              <label className="col-md-4" htmlFor="country">
                Country
              </label>
              <div className="col-md-8 ">
                <select
                  id="country"
                  name="country"
                  className="form-control"
                  value={state.country}
                  onChange={(e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                  }}
                >
                  {countries.map((country) => {
                    return (
                      <option key={country.id} value={country.id}>
                        {country.countryName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* Country ends */}

            {/* Recieve newsletters */}
            <div className="form-group mb-3 d-md-flex">
              <label className="col-md-4"></label>
              <div className="col-md-8 ">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="receiveNewsLetter"
                    id="receiveNewsLetter"
                    value="true"
                    className="form-check-input"
                    checked={state.receiveNewsLetter === true ? true : false}
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.checked });
                    }}
                  />
                </div>
                <label className="form-check-inline" htmlFor="receiveNewsLetter">
                  Recieve News Letter
                </label>
              </div>
            </div>
            {/* Recieve newsletters ends */}
          </div>
          <div className="card-footer text-center">
            <div className="m-1">{message}</div>
          </div>
          <button onClick={onRegisterClick} className="btn btn-primary m-2">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
