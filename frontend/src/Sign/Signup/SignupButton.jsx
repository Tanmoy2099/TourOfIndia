import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHttpClient } from '../../custom-hooks/http-hook';
import { userActions } from '../../Store/user-slice';

import ErrorModal from '../../utils/ErrorModal';

const SignupButton = () => {
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { Name, Email, Password, ConfirmPassword } = useSelector(state => state.signup);

  const isFormValid = Name.isValid && Email.isValid && Password.isValid && ConfirmPassword.isValid;


  const registration = async (event) => {
    event.preventDefault()

    const url = process.env.REACT_APP_SIGNUP;

    let name = Name.value.trim()
    name = name.charAt(0).toUpperCase() + name.slice(1)

    const body = JSON.stringify({
      name,
      email: Email.value,
      password: Password.value,
      passwordConfirm: ConfirmPassword.value
    });

    try {
      const user = await sendRequest(url, 'POST', body);
      const userData = user.data.user;
      if (userData.email) dispatch(userActions.setUser(userData));

    } catch (error) {
      console.log(error);
    }
  }


  return <>
    <ErrorModal onClear={clearError} error={error} />
    <div className="d-flex justify-content-center"
      style={{ color: '#fff' }}>

      <button type="button" onClick={(event) => registration(event)}
        className={`btn btn-primary btn-block btn-lg w-100 `}
        disabled={isLoading || !isFormValid}>
        {isLoading ? 'Loading...' : 'Signup'}
      </button>

    </div>
  </>
}

export default SignupButton;