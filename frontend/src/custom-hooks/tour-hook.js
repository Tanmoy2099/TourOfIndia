import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useHttpClient } from './http-hook';
import { tourActions } from '../Store/currentTour-slice';

const useTour = () => {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const dispatch = useDispatch();

  const fetchTours = useCallback((name, curStateId) => {

    const url = process.env.REACT_APP_GET_TOUR_FOR_STATE + '/'+curStateId;


      const body = JSON.stringify({ stateName: name })
      const header = { 'Content-Type': 'application/json' };

      sendRequest(url, 'POST', body, header)
        .then(res => {
          dispatch(tourActions.updateTours(res.data))
        })
        .catch(err => console.log(err))

  }, [dispatch, sendRequest])


  return { fetchTours, isLoading, error, clearError };
}

export { useTour };