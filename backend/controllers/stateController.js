const State = require('../models/stateModel');
const Tour = require('../models/tourModel');
const crud = require('../controllers/genericCrud');
const AppError = require('./../utils/customError');
const catchAsync = require('./../utils/catchAsync');

exports.getAllStates = crud.getAll(State);
exports.createState = crud.create(State);

exports.getTourForAState = catchAsync(async (req, res, next) => {

  const stateName = req.body.stateName;
  // console.log(stateName);
  const data = await Tour.find({ state: stateName })

  if (!data) {
    return next(new AppError(403, "Tour Data not available"))
  }
  res.status(200).json({
    status: 'ok',
    data: data
  })
})

