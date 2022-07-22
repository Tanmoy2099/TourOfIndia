import React from 'react';
import classes from './stateCard.module.css';

import { tourActions } from '../../Store/currentTour-slice';
import { useDispatch } from "react-redux";

import Flip from 'react-reveal/Flip';

const StateCard = ({ _id: id, name, image }) => {
  const dispatch = useDispatch();

  const fetchTour = () => dispatch(tourActions.selectedStateId(id));


  return <>
  <Flip right>

    <div
      className={` d-flex ${classes.container}`}
      style={{ backgroundImage: `url(${image})` }}
      onClick={fetchTour}
    >

      <div
        className={classes.textCotainer}
        draggable="false">
        <h3 className={classes.title}>{name || 'Title'}</h3>
      </div>
    </div>
    </Flip>
  </>
}

export default StateCard;
