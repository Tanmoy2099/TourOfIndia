import { useEffect, useState } from 'react';
import BookTour from '../Tours/Book Tour/BookTour';

import { useSelector } from 'react-redux';
import TourHeader from '../Tours/TourHeader';
import { useNavigate, useParams } from 'react-router-dom';

import { useHttpClient } from '../../custom-hooks/http-hook';
import ErrorModal from '../../utils/ErrorModal';
import LoadingBar from '../../utils/LoadingBar';



const TourProtected = () => {
  const [curTour, setCurTour] = useState({});
  const { tourId } = useParams();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.user);


  useEffect(() => {
    if (!isLoggedIn) { navigate('/login') };
    if (curTour.length === 0) {navigate('/home')};
  }, [isLoggedIn, curTour]);


  useEffect(() => {
    const url = process.env.REACT_APP_GET_ALL_TOUR + `/${tourId}`
    sendRequest(url)
      .then(res => {
        if (res.status !== 'ok') {
          navigate(-1)
        }
        setCurTour(res.data.data)
      })
      .catch(err => console.log(err))
  }, []);


  return <>
  <ErrorModal error={error} onClear={clearError} />
    <TourHeader {...curTour} booking={true} />
    <LoadingBar isLoading={isLoading}/>
    <BookTour {...curTour} />
  </>
}

export default TourProtected;

