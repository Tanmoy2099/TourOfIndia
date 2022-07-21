import { useCallback } from 'react'

import { useHttpClient } from './http-hook';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../Store/user-slice';

const useFetchUser = () => {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.user)

  const fetchUsers = () => {
    const url = process.env.REACT_APP_IF_LOGGED_IN
    sendRequest(url)
      .then(res => {
        if (res.status !== 'ok') {
          throw new Error(res.data)
        } 
        dispatch(userActions.setUser(res.data.user));
      })
      .catch(err => console.log(err))
  }

  const fetchImg = useCallback(async () => {
    if (data?.photo === 'default.jpg') {
      return
    }
    const url = process.env.REACT_APP_GET_USER_PHOTO;
    const body = JSON.stringify({ photo: data?.photo });
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' };
    try {
      const res = await fetch(url, { method, body, headers});
      const imgBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imgBlob)
      dispatch(userActions.updatePhoto(imageObjectURL));
    } catch (error) {
      console.log(error);
    }
  }, [data?.photo, dispatch])


  return { isLoading, error, clearError, fetchUsers, fetchImg };
}

export { useFetchUser };

