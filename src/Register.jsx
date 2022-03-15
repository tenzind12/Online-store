import { useEffect } from 'react';

function Register() {
  // changing document title
  useEffect(() => {
    document.title = 'Register - eCommerce';
  }, []);

  return <div>Register</div>;
}

export default Register;
