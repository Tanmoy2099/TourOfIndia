import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import classes from './Tours.module.css';
import TourCards from '../../utils/TourCards/TourCards';
import TourHeader from './TourHeader';
import TourList from './TourList';
import ErrorModal from '../../utils/ErrorModal';
import LoadingBar from '../../utils/LoadingBar';


import { useTour } from '../../custom-hooks/tour-hook';
import { useCurrentHttpOperations } from '../../custom-hooks/currentHttpOperations-hook';

const Tours = () => {
  const { Id } = useParams();
  const { currentStateId } = useCurrentHttpOperations();
  const { fetchTours, isLoading, error, clearError } = useTour();
  const { tours } = useSelector(state => state.tour);

  let value = currentStateId();


  useEffect(() => {
    if (value?.name) fetchTours(value.name, Id)
  }, [value, Id, fetchTours]);

  const tourDisplay = tours.map(val => <TourCards tour={val} key={val._id} />);



  return <>
<ErrorModal error={error} onClear={clearError}/>

    <TourHeader {...value} />

    <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4 fs-3 container">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <Link to='/home' className='text-decoration-none'
          >Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {value.name}
        </li>
      </ol>
    </nav>

    <div className='container d-flex flex-column justify-content-center '>
      <p className={classes.heading}>Select the suitable Tour for you!</p>
    </div>
    <LoadingBar isLoading={isLoading}/>
    <TourList >
      {tourDisplay}
    </TourList> 
  </>
}

export default Tours;