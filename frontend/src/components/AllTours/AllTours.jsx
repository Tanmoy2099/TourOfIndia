import React, { useEffect, useState } from 'react';
// import classes from './AllTours.module.css';


//Create component for fetching all data and store in redux, after that show it in respective Link

import _ from 'lodash';
// import { useSelector, useDispatch } from 'react-redux';
import himalaya2 from '../../assets/img/Himalaya 2.jpg';
import TourHeader from '../Tours/TourHeader';

// import { useCurrentHttpOperations } from '../../custom-hooks/currentHttpOperations-hook';
import TourList from '../Tours/TourList';
import { Link } from 'react-router-dom';


import TourCards from '../../utils/TourCards/TourCards';
import ErrorModal from '../../utils/ErrorModal';
import LoadingBar from '../../utils/LoadingBar';

// import allStateNameArray from '../../assets/data/allStateNameArray';
import { useHttpClient } from '../../custom-hooks/http-hook';
// import { allTourActions } from '../../Store/AllTour-slice';

const AllTours = () => {
  // const dispatch = useDispatch();

  // const { allTours } = useSelector(val => val.alltour);
  // const [filteredTour, setFilteredTour] = useState(allTours);
  // const { getAllTours, isLoading, error, clearError } = useCurrentHttpOperations();

  // const [queryPage, setQueryPage] = useState(1);
  const [hasPage, setHasPage] = useState(true);
  const [allTours, setAllTours] = useState([]);
  const [section, setSection] = useState('');
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const limit = 10;
  // useEffect(() => {
  //   getAllTours();
  // }, []);

  // useEffect(() => {
  //   let filterData = alltour.
  //   setFilteredTour(allTours)
  // }, [allTours, setFilteredTour]);


  useEffect(() => {
    fetchTours('')
  }, []);

  // useEffect(() => {
  //   setAllTours([])
  // }, [section, setAllTours]);



  const fetchTours = query => {
    const url = process.env.REACT_APP_GET_ALL_TOUR + '?' + query
    sendRequest(url)
      .then(res => {
        if (res.result === 0) {
          setHasPage(false)
          return
        }
        if (res.status === 'ok') {
          setAllTours(res.data.data)
        } else {
          throw new Error(res.data)
        }
      })
      .catch(err => console.log(err.message))
  }



  let allTourDisplay = allTours?.map(val => <TourCards tour={val} key={val._id} />);


  const buttonClass = 'btn btn-outline-success fs-4 mx-1';
  const headerData = { name: 'All the tours', image: himalaya2 }


  // const randerState = allStateNameArray.map(val => <option key={val}>{val}</option>)

  // const searchByState = val => {
  //   // const stateReg = new RegExp(val, 'g');
  //   const filtered = filteredTour.filter((e) => e.state.match(val))
  //   setFilteredTour(filtered)
  // }

  return <>
    <TourHeader {...headerData} />

    <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4 fs-3 container">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <Link to='/Home' className='text-decoration-none'>Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">All Tours</li>
      </ol>
    </nav>

    <div className='container d-flex  flex-wrap justify-content-center'>
      <ErrorModal error={error} onClear={clearError} />
      {/* All tour */}
      <button className={buttonClass}
        onClick={() => {
          setSection('')
          fetchTours(``)
          }}
      >All tour
      </button>

      {/* This Month */}
      <button className={buttonClass}
        onClick={() => {
          setSection('This Month')
          fetchTours(`monthToTravel=${new Date().getMonth() + 1}`)
        }}
      >This Month
      </button>

      {/* Next Month */}
      <button className={buttonClass}
        onClick={() => {
          setSection('Next Month')
          fetchTours(`monthToTravel=${new Date().getMonth() + 2}`)
        }}
      >Next Month
      </button>

      {/* Next 3 Month */}
      <button className={buttonClass}
        onClick={() => {
          setSection('Next 3 Month')
          fetchTours(`monthToTravel[gte]=${(new Date().getMonth() + 2) % 12 + 1}&monthToTravel[lte]=${(new Date().getMonth() + 2) % 12 + 1}`)
        }}
      >Next 3 Month
      </button>

      {/* State drop down */}
      {/* <select name="states"
        id="states"
        className='fs-4'
        defaultValue='Any'
        onChange={(e) => searchByState(e.target.value)}
      >
        <option value="Any">Any</option>
        {randerState}
      </select> */}

    </div>


    <div className='container d-flex justify-content-center my-3'>
      <h3 style={{ fontFamily: `'Poppins', sansSerif ` }}> Total {allTours.length} Tours</h3>
    </div>
    {allTours.length ? <TourList>
      {allTourDisplay}
    </TourList> : <>
      <h3 style={{ textAlign: 'center' }}>No Tour Available</h3>
    </>
    }

    <LoadingBar isLoading={isLoading} />
  </>
}

export default AllTours;