import React from 'react';
import hillStation from '../../assets/img/mainImage.jpg';
import mountain from '../../assets/img/mountain.jpg';
import himalaya from '../../assets/img/Himalaya.jpg';
import himalaya2 from '../../assets/img/Himalaya 2.jpg';
import classes from './HeroSection.module.css'
import { Link } from 'react-router-dom';

const HeroSection = () => {


  const interval = 5000;


  return <>


    <div className={` container-fluid ${classes.container}`} >

      <div id="carouselExampleSlidesOnly" className={`${classes.heroSlide} carousel slide carousel-fade`} data-bs-ride="carousel">

        <div className={`carousel-inner ${classes.mainImage}`}>

          <div className={`carousel-item active w-100 h-100`} data-bs-interval={interval}>
            <img className={`d-block w-100 ${classes.carouselImg}`} src={hillStation} alt="locations" draggable="false" height='100%' width='100%'/>
          </div>

          <div className={`carousel-item w-100  h-100`} data-bs-interval={interval}>
            <img className={`d-block w-100 ${classes.carouselImg}`} src={mountain} alt="locations2" draggable="false" height='100%' width='100%'/>
          </div>

          <div className={`carousel-item w-100  h-100`} data-bs-interval={interval} draggable="false">
            <img className={`d-block w-100 ${classes.carouselImg}`} src={himalaya} alt="locations2" draggable="false" height='100%' width='100%'/>
          </div>

          <div className={`carousel-item w-100  h-100`} data-bs-interval={interval} draggable="false">
            <img className={`d-block w-100 ${classes.carouselImg}`} src={himalaya2} alt="locations2" draggable="false" height='100%' width='100%'/>
          </div>
        </div>
      </div>

      <div className={`${classes.frontLogo}`}>
        <span className={`${classes["frontLogo--span1"]}`}>Welcome</span>
        <span className={` p-2 ${classes["frontLogo--span2"]}`}> Discover the best places to visit! </span>

        <Link to='/all-tours'
          className={` p-2 btn ${classes["frontLogo--btn"]}`} draggable='false'>
          Find all Tour
        </Link>
      </div>

    </div>
  </>
}

export default HeroSection;
