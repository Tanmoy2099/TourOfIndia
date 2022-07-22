import React, { lazy, Suspense, useEffect } from 'react';
import classes from './MainBody.module.css';

import { useSelector } from 'react-redux';
import { useCurrentHttpOperations } from '../../custom-hooks/currentHttpOperations-hook';

import LoadingSpinner from '../../utils/LoadingSpinner';
import LoadingBar from '../../utils/LoadingBar';
import ErrorModal from '../../utils/ErrorModal';



const SliderCard = lazy(() => import('../SliderCard/SliderCard'));
const HeroSection = lazy(() => import('./HeroSection'));
const Decoration = lazy(() => import('./Decoration'));
const TopTours = lazy(() => import('./TopTours'));

const MainBody = () => {
  const { getTop6Tours, isLoading, error, clearError } = useCurrentHttpOperations();
  const state = useSelector(state => state.states.states)

  useEffect(() => getTop6Tours(), [])

  return <>
    <ErrorModal error={error} onClear={clearError} />
    <div className={classes.background} />

    <Suspense
      fallback={<div className='centered'> <LoadingSpinner /> </div>
      }>
      <HeroSection />

      {/* all the state cards */}
      <div className='w-100 h-auto'
        style={{ backdropFilter: `blur(2px)` }}
      >


          <SliderCard data={state} />

      </div>
    </Suspense>
    <Suspense fallback={
      <div className='centered'> <LoadingSpinner /> </div>
    }>
        <TopTours isLoading={isLoading} />

      <LoadingBar isLoading={isLoading} />
      
        <Decoration />

    </Suspense>
  </>

};

export default MainBody;
