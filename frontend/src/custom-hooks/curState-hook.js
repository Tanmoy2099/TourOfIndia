import { useCallback } from 'react'
import { useDispatch } from 'react-redux';

import { useHttpClient } from './http-hook';
import { tourActions } from '../Store/currentTour-slice';

const useFetch = () => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const dispatch = useDispatch();


  const fetchStates = useCallback((id) => {
    const url = process.env.REACT_APP_GET_ALL_STATES + '/' + id;
    sendRequest(url)
      .then(res => {
        if (res.status === 'ok') {
          const data = res.data.data;

          dispatch(tourActions.setCurState(data))
        } else {
          throw new Error(res.data)
        }
      }).catch(err => console.log(err.message))

  }, [sendRequest, dispatch])


  return { fetchStates, isLoading, error, clearError }
}

export { useFetch };