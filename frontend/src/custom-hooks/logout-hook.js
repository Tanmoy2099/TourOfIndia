import { useCallback } from 'react';
import { useHttpClient } from './http-hook';

import { useDispatch } from 'react-redux';
import { userActions } from '../Store/user-slice';


const useLogout = () => {
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();



  const loggedOut = useCallback(() => {
    const url = process.env.REACT_APP_LOGOUT;

    sendRequest(url)
      .then(res => {
        if (res.status === 'ok') {
          dispatch(userActions.resetUser());
        } else {
          throw new Error(res.data)
        }
      }).catch(err => console.log(err.message))
  }, [dispatch, sendRequest]);

  return loggedOut;
};

export { useLogout };