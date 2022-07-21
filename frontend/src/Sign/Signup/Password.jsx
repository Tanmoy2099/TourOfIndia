import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { signupActions } from '../../Store/Signup-slice';


const Password = () => {

  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);

  const { Password, ConfirmPassword } = useSelector(state => state.signup);
  const dispatch = useDispatch();

  const notValidClass = { backgroundColor: '#fb8d9f75' };


  return <>
    {/*Password */}
    <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form3Example4cg">
        Password *
      </label>
      <input
        type="password"
        id="form3Example4cg"
        className="form-control form-control-lg"
        style={isPasswordTouched && !Password.isValid ? notValidClass : {}}
        autoComplete='on'
        placeholder='Enter password'

        value={Password.value}
        onBlur={() => setIsPasswordTouched(true)}
        onChange={(event) => dispatch(signupActions.password(event.target.value))}
      />
      {isPasswordTouched && !Password.isValid &&
        <h5 className={`p-1 `} style={{ color: 'red' }}>password must be more than 7 characters</h5>
      }
    </div>


    {/* ConfirmPassword */}
    <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form3Example4cdg">
        Repeat your password *
      </label>
      <input
        type="password"
        id="form3Example4cdg"
        className="form-control form-control-lg"
        placeholder='Confirm password'
        style={isConfirmPasswordTouched && !ConfirmPassword.isValid ? notValidClass : {}}
        autoComplete='off'

        value={ConfirmPassword.value}
        onBlur={() => setIsConfirmPasswordTouched(true)}
        onChange={(event) => dispatch(signupActions.confirmPassword(event.target.value))}
      />
      {isConfirmPasswordTouched && !ConfirmPassword.isValid &&
        <h5 className={`p-1 `} style={{ color: 'red' }}>Does not match with the password</h5>
      }
    </div>
  </>
}

export default Password;