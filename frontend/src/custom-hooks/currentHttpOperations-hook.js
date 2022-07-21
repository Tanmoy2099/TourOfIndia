import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// import { useTour } from './tour-hook';
import { useHttpClient } from './http-hook';
import { allTourActions } from '../Store/AllTour-slice';
import { tourActions } from '../Store/currentTour-slice';
import { top6StateActions } from '../Store/top6Tours-slice';



const useCurrentHttpOperations = () => {
  const { Id, tourId } = useParams();
  // const fetchTours = useTour();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const dispatch = useDispatch();

  const { states } = useSelector(state => state);
  const allStates = states.states;


  const currentStateId = () => allStates.find(val => val?._id === Id);

  const getAllTours = useCallback((query) => {

    sendRequest(process.env.REACT_APP_GET_ALL_TOUR + '?' + query)
      .then(res => {
        if (res.status === 'ok') {
          dispatch(allTourActions.AllToursUpdate(res.data.data));
          
        } else {
          throw new Error(res.data)
        }
      }).catch(err => console.log(err.message))
      
  }, [dispatch, sendRequest]);


  
  const currentTourId = useCallback(() => {

    const url = process.env.REACT_APP_GET_ALL_TOUR + '/'+ tourId;

    sendRequest(url)
      .then(res => {
        if (res.status === 'ok') {
          dispatch(tourActions.setCurTour(res.data.data));
        } else {
          throw new Error(res.data)
        }
      }).catch(err => console.log(err.message))

      
  }, [dispatch, sendRequest, tourId]);


  const getCurTourReview = useCallback(() => {
    const url = `${process.env.REACT_APP_GET_OR_POST_REVIEWS}?tourId=${tourId}`;

    sendRequest(url)
      .then(res => {

        if (res.status === 'ok') {
          dispatch(tourActions.setReview(res.data.data));
        } else { throw new Error(res.data) }
      }).catch(err => console.log(err.message))

  }, [tourId, sendRequest, dispatch]);


  const getTop6Tours = useCallback(() => {
    const url = process.env.REACT_APP_GET_ALL_TOUR + '/top-6-cheap';
    sendRequest(url)
      .then(res => {
        if (res.status === 'ok') {
          dispatch(top6StateActions.updateTopTours(res.data.data));
        } else {
          throw new Error(res.data)
        }
      }).catch(err => console.log(err.message))
      
  }, [dispatch, sendRequest]);




  return {
    getAllTours,
    getTop6Tours,
    currentTourId,
    currentStateId,
    getCurTourReview,
    isLoading, error, clearError
  };
}

export { useCurrentHttpOperations };

