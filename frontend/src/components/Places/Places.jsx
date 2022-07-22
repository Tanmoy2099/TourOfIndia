
import React, { useEffect } from 'react';
// import classes from './Places.module.css';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Reviews from '../Reviews/Reviews';
import TourHeader from '../Tours/TourHeader';
import TourPlaces from '../Tours/TourPlaces/TourPlaces';
import TourDetails from '../Tours/TourDetails/TourDetails';

import { useCurrentHttpOperations } from '../../custom-hooks/currentHttpOperations-hook';
import MapBox from './MapBox';


const Places = () => {
  const { Id } = useParams();
  const { currentTourId, getCurTourReview } = useCurrentHttpOperations();
  const { curTour, reviews } = useSelector(state => state.tour);



  useEffect(() => {
    currentTourId();
    getCurTourReview();
    return () => {
      currentTourId();
      getCurTourReview();
    }
  }, [currentTourId, getCurTourReview]);


  // useEffect(() => {
  //   getCurTourReview();

  //   return () => {
  //     getCurTourReview();
  //   }
  // }, [getCurTourReview]);




  const locations = curTour.place?.map(location => <TourPlaces {...location} key={location._id} />);

  return <>
    <TourHeader {...curTour} />

    <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4 fs-3 container">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <Link to='/Home' className='text-decoration-none'
          >Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/${Id}/tour`} className='text-decoration-none'
          >{curTour.state}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {curTour.name}
        </li>
      </ol>
    </nav>

    {/* Need to make a back button or LINK to goto the state page */}
    <TourDetails {...curTour} />

    {/* Have to design places in a tour also prie of the tour and all other details */}
    <h1 className='container text-center my-3'
      style={{ fontFamily: `'Dancing Script', cursive`, fontSize: `4rem`, fontWeight: `900` }}
    >Places to visit!</h1>
    {/* <div className={classes.container}> */}
      {locations}


    <MapBox place={curTour.place} />


    {/* </div> */}
    <h1 className='container text-center my-3'
      style={{
        fontFamily: `'Dancing Script', cursive`,
        fontSize: `4rem`,
        fontWeight: `900`
      }} >Tour Reviews</h1>

    <Reviews reviews={reviews} />

  </>
}

export default Places;
