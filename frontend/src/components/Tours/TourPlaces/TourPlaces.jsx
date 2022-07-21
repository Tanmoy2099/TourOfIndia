// import { useEffect, useState } from 'react';
import classes from './TourPlaces.module.css';


const TourPlaces = ({ coverImage, images, name, info, coordinate }) => {

// console.log(images);

  const interval = 5000;
  const allImages = images.map((img, index) => {
    return <div key={index} className={`carousel-item w-100  h-100`} data-bs-interval={interval}>
      <img className={`d-block w-100 ${classes.carouselImg}`} src={img} alt={`location ${index}`} draggable="false" />
    </div>
  })


  return <>

    <div className={`  ${classes.container}`}>

      <div id="carouselExampleSlidesOnly" className={`carousel slide carousel-fade`} data-bs-ride="carousel">

        <div className={`carousel-inner ${classes.mainImage}`}>

          <div className={`carousel-item active w-100 h-100`} data-bs-interval={interval}>
            <img className={`d-block w-100 ${classes.carouselImg}`} src={coverImage} alt="locations" draggable="false" />
          </div>
          {allImages}
        </div>
        <span className={`${classes["frontLogo--span1"]}`}>{name}</span>
      </div>

      <div className={`${classes.description}`}>
        <p className={` p-2 ${classes["description--info"]}`}> <button className='btn btn-outline-success btn-sm p-1'> Info: </button> {info}
        </p>
        <div className={classes.coordinate}>
          <p>
            <button className='btn btn-outline-success btn-sm  p-1 fs-3'> lat: </button> {coordinate.lat}
          </p>
          <p>
            <button className='btn btn-outline-success btn-sm  p-1 fs-3'> long:</button> {coordinate.long}
          </p>

        </div>
      </div>

    </div>
  </>
}

export default TourPlaces;
