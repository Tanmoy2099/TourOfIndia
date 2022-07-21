
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ChangePassContainer from './ChangePassContainer';


import { useHttpClient } from '../../../../custom-hooks/http-hook';
import { userActions } from '../../../../Store/user-slice';

import ErrorModal from '../../../../utils/ErrorModal';
import MessageModal from '../../../../utils/MessageModal';

const ChangePassword = () => {

  const dispatch = useDispatch();

  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const initialTouch = { cur: false, new: false, confirm: false }
  const [isTouched, setIsTouched] = useState(initialTouch);
  const [message, setMessage] = useState('');

  const { isLoading, error, clearError, sendRequest } = useHttpClient();



  const sendResetPassword = async (event) => {
    event.preventDefault();
    const url = process.env.REACT_APP_GET_ALL_USER + '/updatePassword/';

    const body = JSON.stringify({ passwordCurrent, password, passwordConfirm });

    try {
      const res = await sendRequest(url, 'PATCH', body)
      if (res.status !== 'ok') {
        throw new Error(res.data)
      }

      dispatch(userActions.setUser(res.data.user));
      setMessage('Password Sucessfully Updated');
    } catch (error) {
      console.log(error);
    } finally{
      setPasswordCurrent('');
      setPassword('');
      setPasswordConfirm('');
      setIsTouched(initialTouch)
    }
  }


  const notValidClass = { backgroundColor: '#fb8d9f75' };
  return <>
    <ErrorModal onClear={clearError} error={error} />
    <MessageModal header='Success!' onClear={() => setMessage('')} message={message} />
    <ChangePassContainer heading={'CHANGE PASSWORD FORM'}>
      <form>
        {/* Enter Current password */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="curPass">
            Enter New Password *
          </label>
          <input
            type="password"
            id="curPass"
            style={isTouched.cur && (passwordCurrent.length < 8) ? notValidClass : {}}
            className="form-control form-control-lg"
            autoComplete='on'
            value={passwordCurrent}
            onBlur={() => setIsTouched(val => {
              return { ...val, cur: true }
            })}
            onChange={(event) => setPasswordCurrent(event.target.value)}
            minLength='8'
            required
          />
          {isTouched.cur && (passwordCurrent.length < 8) &&
            <h5 className={`p-1 `} style={{ color: 'red' }}> Password length is 8 or more</h5>
          }
        </div>

        {/* ------------------------------------------------------------- */}
        
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
            {isTouched.new && (password.length < 8) &&
              <h5 className={`p-1 `} style={{ color: 'red' }}> Password length should be 8 or more</h5>
            }
          </div>

          {/* ----------------------------------------------------------- */}
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
            {isTouched.confirm && (password !== passwordConfirm) &&
              <h5 className={`p-1 `} style={{ color: 'red' }}> Please Enter the same Password</h5>
            }
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Submit button */}

          <div className="d-flex justify-content-center" style={{ color: '#fff' }}>
            <button
              type="button"
              onClick={event => sendResetPassword(event)}
              disabled={isLoading || (password !== passwordConfirm) || !passwordCurrent}
              className={`btn btn-primary btn-block btn-lg w-100`}>
              {isLoading ? 'Loading...' : 'UPDATE'}
            </button>
          </div>
          {/* ----------------------------------------------------------- */}
        </form>
      </ChangePassContainer>
    </>
}

    export default ChangePassword;