// import React, { useEffect, useState } from 'react'
import ReviewForm from './ReviewForm';
import ReviewCard from '../../utils/ReviewCard/ReviewCard';


const Reviews = ({ reviews }) => {


  const renderReview = reviews?.map((val) => <ReviewCard key={val._id} {...val} />);

  return <>
    <div className="container accordion" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header " id="panelsStayOpen-headingOne">
          <button
            className="accordion-button fs-3 mb-4"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseOne"
          >
            Create Your Review
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body fs-2">
            <div className='container d-flex justify-content-center w-100'>
              <ReviewForm />
            </div>
          </div>
        </div>
        <div className='container d-flex flex-wrap justify-content-center'>
          {!!reviews ? renderReview : <h1 className='fs-2 '>Be The First Person to Review</h1>}
        </div>
      </div>
    </div>

  </>
}

export default Reviews;