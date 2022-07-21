import React from 'react'
import { Link } from 'react-router-dom';

const IfNotSignIn = () => {
  return <>
    <p className="text-center text-muted mt-5 mb-0 fs-5" style={{ textDecoration: 'none' }}>
      Don't have an account?{" "}
      <Link to="/signup" className="fw-bold text-body ">
        <u>Sign up here</u>
      </Link>
    </p>
  </>
}

export default IfNotSignIn;