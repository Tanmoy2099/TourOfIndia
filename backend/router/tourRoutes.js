const express = require('express');
const tourController = require('../controllers/tourControllers')
const authController = require('../controllers/authControllers')
const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour)
  
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/this-month')
  .get(tourController.aliasTourThisMonth);
router
  .route('/next-month')
  .get(tourController.aliasTourNextMonth);


  router
  .route('/:id') // On one tour
    .get(tourController.getOneTour)
    .patch(authController.protect,
      authController.restrictTo('admin', 'guide'),
      tourController.uploadTourImages,
      tourController.resizeTourImages,
      tourController.updateOneTour)
  .delete( authController.protect,
    authController.restrictTo('admin', 'guide'),
    tourController.deleteOneTour)
  
  router
    .route('/:id/places')
    .get(authController.protect, tourController.getPlacesBasedOnTour) // created
  router
    .route('/:id/reviews')
    .get(authController.protect, tourController.getReviewsOfTheTour) // created
    
module.exports = router;

