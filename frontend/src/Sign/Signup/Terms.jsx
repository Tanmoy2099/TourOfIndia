import React from 'react';

const Terms = () => {
  return <>
    <div className="form-check d-flex justify-content-center mb-5 fs-5">
      <input
        className="form-check-input me-2"
        type="checkbox"
        defaultValue=""
        id="form2Example3cg"
      />
      <label
        className="form-check-label"
        htmlFor="form2Example3g"
      >
        I agree all statements in{" "}
        <a href="#!" className="text-body">
          <u>Terms of service</u>
        </a>
      </label>
    </div>
  </>
}

export default Terms;