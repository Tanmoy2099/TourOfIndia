const { Router } = require("express");
const placeController = require('../controllers/placeControllers.js');

const router = Router();

router
    .route('/')
    .get(placeController.getAllPlaces)
    .post(placeController.createPlace)

router
    .route('/:id')
    .get(placeController.getOnePlace)
    .patch(placeController.updateOnePlace)
    .delete(placeController.deleteOnePlace)

module.exports = router;

