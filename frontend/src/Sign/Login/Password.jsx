import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../../Store/Login-slice';


const Password = () => {

  const [isTouched, setIsTouched] = useState(false);

  const { Password } = useSelector(state => state.login);

  const dispatch = useDispatch();

  const notValidClass = { backgroundColor: '#fb8d9f75' };


  return <>
    <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form3Example4cg">
        Password *
      </label>
      <input
        type="password"
        id="form3Example4cg"
        className="form-control form-control-lg"
        style={isTouched && !Password.isValid ? notValidClass : {}}
        autoComplete='on'
        placeholder='Enter password'

        value={Password.value}
        onBlur={() => setIsTouched(true)}
        onChange={(event) => dispatch(loginActions.password(event.target.value))}
      />
      {isTouched && !Password.isValid &&
        <h5 className={`p-1 `} style={{ color: 'red' }}>password must be more than 7 characters</h5>
      }
    </div>
  </>
}

export default Password;