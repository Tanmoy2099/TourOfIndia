import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { signupActions } from '../../Store/Signup-slice';

const Name = () => {

  const [isTouched, setIsTouched] = useState(false);

  const name = useSelector(state => state.signup.Name);
  const dispatch = useDispatch();

  const notValidClass = { backgroundColor: '#fb8d9f75' };

  return <>
    {/* NAME */}
    <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form3Example1cg"> Your Name * </label>
      <input type="text" id="form3Example1cg" className={`form-control form-control-lg `}
        style={isTouched && !name.isValid ? notValidClass : {}}
        autoComplete='on'
        placeholder='Enter Your Full Name'

        value={name.value}
        onBlur={() => setIsTouched(true)}
        onChange={(event) => dispatch(signupActions.name(event.target.value))}
      />
      {isTouched && !name.isValid &&
        <h5 className={`p-1 `} style={{ color: 'red' }}>Please Enter Your Name</h5>
      }
    </div>

  </>
}

export default Name;