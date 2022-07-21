
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import classes from './ReviewForm.module.css';

import { useHttpClient } from '../../custom-hooks/http-hook';
import ErrorModal from '../../utils/ErrorModal';
import { tourActions } from '../../Store/currentTour-slice';

const ReviewForm = () => {
  const dispatch = useDispatch()
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rate, setRate] = useState(4.5);
  const [review, setReview] = useState('');
  const { tourId } = useParams();
  const { data } = useSelector(state => state.user);
  let status = useRef();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // tour is going undefined, need to fix it
  const submitReview = async () => {
    const url = process.env.REACT_APP_GET_OR_POST_REVIEWS;
    const body = JSON.stringify({ rating: rate, review: review, tour: tourId });

    sendRequest(url, 'POST', body)
      .then(res => {
        status.current = (res.status === 'ok')
        if (status.current) {
          dispatch(tourActions.setReview(res.data.data));
        } else {
          throw new Error(res.data)
        }
      }).catch(err => console.log(err.message));
    setRate(4.5);
    setReview('');
    setIsSubmitted(true)
  }


  return <div className={classes.container}>

    <ErrorModal error={error} onClear={clearError} />
    {isSubmitted ? <>
      <h1 className='container text-center my-3'
        style={{
          fontFamily: `'Dancing Script', cursive`,
          fontSize: `3rem`,
          fontWeight: `500`,
          textAlign: `center`
        }}>{(status.current) ? 'Review Submitted Successfully': 'Failed to create Review'}</h1>
    </> : <>
      <div className={`mb-3 w-100`}>
        <label htmlFor="exampleFormControlInput1" className="form-label fs-4">
          Name* :
        </label>
        <input
          type="text"
          className="form-control fs-4"
          id="exampleFormControlInput1"
          placeholder="Login to give your review"
          value={data.name}
          draggable='false'
          disabled

        />
      </div>
      <div className="mb-3 w-100 ">
        <label htmlFor="exampleFormControlTextarea1" className="form-label fs-4">
          Write your review* :
        </label>

        <textarea
          className="form-control w-100 fs-3"
          placeholder='Enter your review'
          style={{ resize: 'none' }}
          id="exampleFormControlTextarea1"
          rows={4}
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <hr />

        <label htmlFor="customRange3" className="form-label mx-3">
          Rate* :<strong> {rate} </strong>
        </label>
        <br />
        <input
          id="customRange3"
          type="range"
          className={`mt-4 `}
          style={{ width: '28rem' }}
          min={0}
          max={5}
          step="0.1"
          value={rate}
          onChange={e => setRate(e.target.value)}
        />
        <button className="btn btn-outline-success w-100 mt-4 fs-5"
          disabled={(data?.id ? false : true) || !review}
          onClick={submitReview}
        >{isLoading ? 'Loading...' : 'Submit'}</button>
      </div></>}


  </div>
}

export default ReviewForm;