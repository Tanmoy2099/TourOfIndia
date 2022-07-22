import React from 'react';
import { Link } from 'react-router-dom';
import classes from './TourHeader.module.css';

const TourHeader = props => {

  return <>
    <div className={classes.coverImageContainer} draggable="false">
      <div className={`${classes.frontLogo}`}>
        <h1 className={`${classes["frontLogo--span1"]}`}>{props?.name}</h1>
        {props?.state && <>
          <h3 className={`fs-2 ${classes["frontLogo--span1"]}`}>{props?.state}</h3>

          {!props?.booking && <Link to={`/book-tour/${props._id}`}
            className={` p-2 btn ${classes["frontLogo--btn"]}`} draggable='false'>
            Book the Tour
          </Link>
          }
        </>
        }

      </div>
      <img src={props?.image || props?.coverImage} alt="tourImg" className='w-100' draggable="false" />
    </div>
  </>
}

export default TourHeader;

