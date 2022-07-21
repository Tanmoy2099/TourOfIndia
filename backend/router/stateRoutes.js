const { Router } = require("express");

const stateController = require('../controllers/stateController.js');
const authController = require('../controllers/authControllers')


const router = Router();

router
  .route('/')
  .get(stateController.getAllStates)
  .post(authController.protect,
    authController.restrictTo('admin'),
    stateController.createState)

router
  .route('/:id')
.post(stateController.getTourForAState)


module.exports = router;
