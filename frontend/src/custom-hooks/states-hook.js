import { useCallback } from 'react'
import { useDispatch } from 'react-redux';

import { useHttpClient } from './http-hook';
import { stateActions } from '../Store/state-slice';

const useFetch = () => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const dispatch = useDispatch();


  const fetchStates = useCallback(() => {
    const url = process.env.REACT_APP_GET_ALL_STATES + '?haveTour=true';
    
    sendRequest(url)
      .then(res => {
        if (res.status === 'ok') {
          const result = res.results;
          const data = res.data.data;

          dispatch(stateActions.updateState({ result, data }))
        } else {
          throw new Error(res.data)
        }
      }).catch(err => console.log(err.message))

  }, [sendRequest, dispatch])


  return { isLoading, error, clearError, fetchStates}
}

export { useFetch };