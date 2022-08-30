import React from 'react';

// import classes from './FlexBetween.module.css';

const FlexBetween = ({children}) => {
  return <div className='d-flex justify-content-between'> {children} </div>
}

export default FlexBetween;