import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../../Store/Login-slice';


const Email = () => {

  const [isTouched, setIsTouched] = useState(false);

  const email = useSelector(state => state.login.Email);
  const dispatch = useDispatch();

  const notValidClass = { backgroundColor: '#fb8d9f75' };


  return <>
    <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form3Example3cg">
        Your Email Address *
      </label>
      <input
        type="email"
        id="form3Example3cg"
        style={isTouched && !email.isValid ? notValidClass : {}}
        className="form-control form-control-lg"
        autoComplete='on'
        value={email.value}
        onBlur={() => setIsTouched(true)}
        onChange={(event) => dispatch(loginActions.email(event.target.value))}
        required
      />

      {isTouched && !email.isValid &&
        <h5 className={`p-1 `} style={{ color: 'red' }}>Please Enter a valid Email id</h5>
      }

    </div>
  </>
}

export default Email;