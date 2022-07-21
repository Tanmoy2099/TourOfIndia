// import React, { useEffect } from 'react';
import classes from './TourList.module.css';



const TourList = ({ children }) => {

  return <>
    <div className={classes.container}>
      {children}
    </div>
  </>
}

export default TourList;

