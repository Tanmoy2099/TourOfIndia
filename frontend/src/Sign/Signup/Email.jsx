import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { signupActions } from '../../Store/Signup-slice';



const Email = () => {

  const [isTouched, setIsTouched] = useState(false);

  const email = useSelector(state => state.signup.Email);
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
        className="form-control form-control-lg"
        style={isTouched && !email.isValid ? notValidClass : {}}
        autoComplete='on'
        placeholder='Enter Your Email id'

        value={email.value}
        onBlur={() => setIsTouched(true)}
        onChange={(event) => dispatch(signupActions.email(event.target.value))}
      />
      {isTouched && !email.isValid &&
        <h5 className={`p-1 `} style={{ color: 'red' }}>Please Enter a valid Email id</h5>
      }

    </div>
  </>
}

export default Email;