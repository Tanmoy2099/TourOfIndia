import React from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai';

import classes from './ScrollToTop.module.css';

const ScrollToTop = () => {
  return <>
    <p className={classes.gotoTop}
      onClick={() => window.scrollTo(0, 0)}
    ><AiOutlineArrowUp /></p>
  </>
}

export default ScrollToTop;