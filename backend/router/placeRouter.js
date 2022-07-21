const { Router } = require("express");
const placeController = require('../controllers/placeControllers.js');
const authController = require('../controllers/authControllers')

const router = Router();

router
  .route('/')
  .get(placeController.getAllPlaces)
  .post(authController.protect,
    authController.restrictTo('admin'),
    placeController.createPlace)

router
  .route('/:id')
  .get(placeController.getOnePlace)
  .patch(authController.protect,
    authController.restrictTo('admin'),
    placeController.updateOnePlace)
  .delete(authController.protect,
    authController.restrictTo('admin'),
    placeController.deleteOnePlace)

module.exports = router;

