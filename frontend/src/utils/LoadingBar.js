import React from 'react'
import classes from './LoadingBar.module.css';

const LoadingBar = (props) => {
  return <>
    { props.isLoading && <div className="container d-flex justify-content-center">
      <div className={ classes["lds-loader"] }><div></div><div></div><div></div></div>
    </div>
    }
  </>
}

export default LoadingBar;