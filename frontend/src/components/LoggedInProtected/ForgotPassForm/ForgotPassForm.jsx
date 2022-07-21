
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { useHttpClient } from '../../../custom-hooks/http-hook';
import { userActions } from '../../../Store/user-slice';

import ResetFormContainer from './resetFormContainer';
import ErrorModal from '../../../utils/ErrorModal';
import { useNavigate } from 'react-router-dom';

const ForgotPassForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isTouched, setIsTouched] = useState({ new: false, confirm: false });
  const [code, setCode] = useState('');

  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const { isLoggedIn } = useSelector(state => state.user)

  const sendResetPassword = async (event) => {
    event.preventDefault();
    if (!code) {
      return
    }
    const url = process.env.REACT_APP_GET_ALL_USER + '/resetPassword/' + code;

    const body = JSON.stringify({ password, passwordConfirm });
    try {
      const res = await sendRequest(url, 'PATCH', body)
      if (res.status !== 'ok') {
        throw new Error(res.data)
      }
        dispatch(userActions.setUser(res.data.user))
        navigate('/my-profile')
    } catch (error) {
      console.log(error);
    }
  }



  const notValidClass = { backgroundColor: '#fb8d9f75' };
  return <>
    <ErrorModal onClear={clearError} error={error} />
    <ResetFormContainer>
      {isLoggedIn ? <>
        <h3 className='text-align-center m-auto'>Reset Successful !</h3>
      </> : <form>
        {/* Enter Varification Code */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="veriCode">
            Enter Varification Code *
          </label>
          <input
            type="text"
            id="veriCode"
            className="form-control form-control-lg"
            autoComplete='off'
            value={code}
            onChange={(event) => setCode(event.target.value)}
            required
          />
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* Enter new password */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="newPass">
            Enter New Password *
          </label>
          <input
            type="password"
            id="newPass"
            style={isTouched.new && (password.length < 8) ? notValidClass : {}}
            className="form-control form-control-lg"
            autoComplete='on'
            value={password}
            onBlur={() => setIsTouched(val => {
              return { ...val, new: true }
            })}
            onChange={(event) => setPassword(event.target.value)}
            minLength='8'
            required
          />
          {isTouched.new && (password.length < 8) && <h5 className={`p-1 `} style={{ color: 'red' }}> Password length should be 8 or more</h5>
          }
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* Enter confirm password */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="confirmPass">
            Confirm Password *
          </label>
          <input
            type="password"
            id="confirmPass"
            style={isTouched.confirm && (password !== passwordConfirm) ? notValidClass : {}}
            className="form-control form-control-lg"
            autoComplete='on'
              value={passwordConfirm}
            onBlur={() => setIsTouched(val => {
              return { ...val, confirm: true }
            })}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            minLength='8'
            required
          />
          {isTouched.new && (password !== passwordConfirm) && <h5 className={`p-1 `} style={{ color: 'red' }}> Please Enter the same Password</h5>
          }
        </div>

        {/* ---------------------------------------------------------------------- */}
        {/* Submit button */}

        <div className="d-flex justify-content-center" style={{ color: '#fff' }}>
          <button
            type="button"
            onClick={event => sendResetPassword(event)}
            disabled={isLoading || (password !== passwordConfirm) || !code}
            className={`btn btn-primary btn-block btn-lg w-100`}>
            {isLoading ? 'Loading...' : 'RESET'}
          </button>
        </div>
        {/* ---------------------------------------------------------------------- */}
      </form>
      }
    </ResetFormContainer>
  </>
}

export default ForgotPassForm;