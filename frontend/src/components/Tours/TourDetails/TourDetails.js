import React from 'react';
import classes from './TourDetails.module.css';

import { BiRupee } from 'react-icons/bi';
import { BiGroup } from 'react-icons/bi';
import { GiDuration } from 'react-icons/gi';
import { FiFlag } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

const TourDetails = props => {

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const displayMonth = props.monthToTravel?.map(val => <li key={val}>{months[val-1]},</li>)

  const iconStyle = { fontSize: '2rem', color: 'green' };
  const fs2 = "fs-2";
  return <>
    <div className={classes.container}>
      <h4> <span>Information:</span> {props.info}</h4>

      <div className={classes.parameterContainer}>

        {/* Money & People*/}
        <div className={classes.parameters}>
          {/* Money  */}
          <h2 className={fs2}>
            <BiRupee style={iconStyle} />
            {props?.travelPackage || "NaN"}<span className='fs-5'>/Person</span>
          </h2>

          {/* People */}
          <h2 className={fs2}>
            <BiGroup style={iconStyle} /> {` `}
            {props?.groupSizeMin || "NaN"}-{props?.groupSizeMax || "NaN"} <span className='fs-5'>People</span>
          </h2>

        </div>

        {/*rating */}
        <div className={classes.parameters}>
          {/* Rating  */}
          <h2 className='fs-1'>
            <AiFillStar style={iconStyle} />
            {` `}{props?.ratingsAverage || "NaN"} <span className='fs-4' >
            </span>
          </h2>
        </div>

        {/* Places & Duration */}
        <div className={classes.parameters}>
          {/* Places  */}
          <h2 className={fs2}>
            <FiFlag style={iconStyle} /> {` `}{props.place?.length || "NaN"} <span className='fs-5' >stops</span>
          </h2>

          {/* Duration */}
          <h2 className={fs2}>
            <GiDuration style={iconStyle} />
            {` `}{props?.duration || "NaN"} <span className='fs-4' >days</span>
          </h2>
          
        </div>
        
      </div>
      <ul> <span>Travel Month:</span>
        {displayMonth}
      </ul>
    </div>
  </>
}

export default TourDetails;
