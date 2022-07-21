
import { useState } from 'react';


import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../../custom-hooks/http-hook';
import { userActions } from '../../Store/user-slice';

import ErrorModal from '../../utils/ErrorModal';

const SignInButton = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { Email, Password } = useSelector(state => state.login);

  const isFormValid = Email.isValid && Password.isValid;

  // console.log( Email.value, Password.value );

  const login = async (event) => {
    event.preventDefault();

    const url = process.env.REACT_APP_LOGIN;

    const body = JSON.stringify({
      email: Email.value,
      password: Password.value
    });

    try {
      const user = await sendRequest(url, 'POST', body);
      dispatch(userActions.setUser(user.data.user));

    } catch (error) {
      console.log(error);
    }
  }


  const sendEmail = async () => {

    try {
      if (!Email.isValid) {
        throw new Error('Please enter a valid email');
      }
      const url = process.env.REACT_APP_GET_ALL_USER + '/forgotPassword';
      const body = JSON.stringify({
        email: Email.value
      });
      const headers = { 'Content-Type': 'application/json' }
      const res = await sendRequest(url, 'POST', body, headers);
      if (res.status !== 'ok') {
        throw new Error(res.data)
      }
      navigate('/forgot-password')

    } catch (error) {
      setErr(error.message)
    }
  }


  const forgotPass = {
    textAlign: 'center',
    margin: '2rem 0 auto auto'

  }

  return <>
    <ErrorModal onClear={clearError} error={error} />
    <div className="d-flex justify-content-center" style={{ color: '#fff' }}>
      <button
        type="button"
        onClick={event => login(event)}
        className={`btn btn-primary btn-block btn-lg w-100`}
        disabled={isLoading || !isFormValid}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
    </div>

    {/* ForgotPassword */}
    <div style={forgotPass}>
      <h5 style={{
          color: '#000',
          textDecoration: 'none',
          fontWeight: '500',
          cursor: 'pointer'
        }}
        onClick={sendEmail}
      > Forgot Password </h5>
    </div>

    <ErrorModal onClear={() => setErr(null)} error={err} />
  </>
}

export default SignInButton;

