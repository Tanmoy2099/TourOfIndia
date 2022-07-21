import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import classes from './AdminTourCard.module.css';
import FlexBetween from '../../FlexBetween';

import { MdLocationOn } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';
import { BiGroup } from 'react-icons/bi';
import { GiDuration } from 'react-icons/gi';
import { FiFlag } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

const AdminTourCard = ({ tour }) => {
  const iconStyle = { fontSize: '2rem', color: 'green' };



  return <>
    <div className={classes.tourContainer}>

      {/* Tour Image & Name */}
      <div className={classes.tourImage} style={{ backgroundImage: `url(${tour?.coverImage})` }}>
        <h3>{tour?.name}</h3>
      </div>

      {/* Tour description */}
      <div style={{ margin: '1rem', marginBottom: '0.2rem' }}>
        <p className={classes.summery}> {tour?.summery}...
        </p>

        <FlexBetween>
          {/* Duration */}
          <h4 className={classes.TourDetails}>
            <GiDuration style={iconStyle} />
            {` `}{tour?.duration || "NaN"} <span className='fs-4' >days</span>
          </h4>

          {/* Money */}
          <h4 className={`fs-3 ${classes.TourDetails}`}>
            <BiRupee style={iconStyle} />
            {tour?.travelPackage || "NaN"}<span className='fs-4'>/Person</span>
          </h4>
        </FlexBetween>

        <FlexBetween>
          {/* State */}
          <h4 className={classes.TourDetails}>
            <MdLocationOn style={iconStyle} /> {` `}{tour?.state || "NaN"}
          </h4>

          {/* People */}
          <h4 className={classes.TourDetails}>
            <BiGroup style={iconStyle} /> {` `}
            {tour?.groupSizeMin || "NaN"}-{tour?.groupSizeMax || "NaN"} <span className='fs-4'>People</span>
          </h4>
        </FlexBetween>

        {/* Places number & rating */}
        <FlexBetween>
          {/* Places  */}
          <h4 className={classes.TourDetails}>
            <FiFlag style={iconStyle} /> {` `}{tour?.place.length || "NaN"} <span className='fs-4' >stops</span>
          </h4>

          {/* Rating  */}
          <h4 className={classes.TourDetails}>
            <AiFillStar style={iconStyle} /> {` `}{tour?.ratingsAverage || "NaN"}
          </h4>
        </FlexBetween>
      </div>
      <div style={{ margin: '1rem' }}>


        {/* Creating Link to Specific tour */}
        <Link to={`/admin-access/${ tour?._id}`}
          className={`btn btn-lg fs-3 w-100`} style={{ backgroundColor: 'green', color: 'white' }}>
          Modify
        </Link>
      </div>
    </div>
  </>
}

export default AdminTourCard;
