import React from 'react';
import { Link } from 'react-router-dom';

const IfNotSignedUp = () => {
  return <>
    <p className="text-center text-muted mt-5 mb-0 fs-5">
      Already have an account?{" "}
      <Link to="/login" className="fw-bold text-body">
        <u>Login here</u>
      </Link>
    </p>
  </>
}

export default IfNotSignedUp;