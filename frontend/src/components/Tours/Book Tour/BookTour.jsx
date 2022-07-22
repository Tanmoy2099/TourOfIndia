import { useState } from 'react'

import classes from './BookTour.module.css';

const BookTour = (props) => {
  const [noOfPeople, setNoOfPeople] = useState(1);

  console.log(noOfPeople);

  return <>
    <div className={`container my-5 d-flex flex-column h-75 w-100 justify-content-center ${classes.container}`}>
      <h2 className={classes.header}>{props.name}</h2>
      <div className='d-flex justify-content-between'>

        <label className='fs-3' htmlFor="people">No. of people (1-10)</label>

        <select name="people" id="people"
          value={noOfPeople}
          min='1' max='10'
          className='fs-3 text-align-center'
          onChange={(e) => setNoOfPeople(+e.target.value)} >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <option key={num} value={`${num}`}>{num}</option>)}
        </select>

      </div>
      <div className='d-flex justify-content-between'>
        <p className='fs-3'>Total Price</p>
        <p className='fs-3'>{noOfPeople} x {props.travelPackage} = {noOfPeople*props.travelPackage} </p>

      </div>

      <button className='btn btn-success btn-lg'>Procide to pay</button>
    </div>
  </>
}

export default BookTour;