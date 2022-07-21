
const Place = require('../models/placeModel');
const Tour = require('../models/tourModel');
const crud = require('../controllers/genericCrud');
const catchAsync = require('../utils/catchAsync');
const customError = require('../utils/customError');

exports.getAllPlaces = crud.getAll(Place);
exports.getOnePlace = crud.getOne(Place);
exports.deleteOnePlace = crud.deleteOne(Place);

exports.updateOnePlace = catchAsync(async (req, res, next) => {
  if (req.body.placeIn) {
    return new customError(400, 'Tour name is not allowed to change')
  }
  const doc = await Place.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'ok',
    data: doc
  });
});

exports.createPlace = catchAsync(async (req, res, next) => {
  // if (!req.body.tourName) {
  //   return new customError(400, 'Please provide the tour name')
  // }
  // req.body.tourName = req.body.tourName[0].toUpperCase() + req.body.tourName.substring(1).toLowerCase();

  // tourDetails = await Tour.findOne({ name: req.body.tourName })
  // if (!tourDetails) {
  //   return new customError(400, 'Please create the tour first')
  // }

const { name, info, images, coverImage, coordinate, location } = req.body
console.log(req.body);

  const doc = await Place.create(req.body);

  res.status(201).json({
    status: 'ok',
    data: doc
  });
});

