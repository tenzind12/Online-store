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

  // changing document title
  useEffect(() => {
    document.title = 'Register - eCommerce';
  }, []);

  return (
    <div className="row">
      <div className="col-lg-6 col-md-7 mx-auto">
        <div className="card border-primary shadow my-2">
          <div className="card-header border-bottom border-primary">
            <h4 style={{ fontSize: '40px' }} className="text-primary">
              Register
            </h4>
          </div>
          <div className="card-body border-bottom ">
            {/* email */}
            <div className="form-group mb-3 d-md-flex">
              <label className="col-md-4" htmlFor="email">
                Email
              </label>
              <div className="col-md-8 ">
                <input type="email" id="email" name="email" className="form-control" />
              </div>
            </div>
            {/* email ends */}

            {/* password */}
            <div className="form-group mb-3 d-md-flex">
              <label className="col-md-4" htmlFor="password">
                Password
              </label>
              <div className="col-md-8 ">
                <input type="password" id="password" name="password" className="form-control" />
              </div>
            </div>
            {/* password ends */}

            {/* Full name */}
            <div className="form-group mb-3 d-md-flex">
              <label className="col-md-4" htmlFor="fullname">
                Full name
              </label>
              <div className="col-md-8 ">
                <input type="text" id="fullname" name="fullname" className="form-control" />
              </div>
            </div>
            {/* Full name ends */}

            {/* DOB */}
            <div className="form-group mb-3 d-md-flex">
              <label className="col-md-4" htmlFor="dob">
                DOB
              </label>
              <div className="col-md-8 ">
                <input type="date" id="dob" name="dob" className="form-control" />
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
                <select id="country" name="country" className="form-control">
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
        </div>
      </div>
    </div>
  );
}

export default Register;
