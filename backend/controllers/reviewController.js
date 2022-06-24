const Review = require('./../models/reviewModel');
const crud = require('./genericCrud');
// const catchAsync = require('./../utils/catchAsync');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = crud.getAll(Review);
exports.getReview = crud.getOne(Review);
exports.createReview = crud.create(Review);
exports.updateReview = crud.updateOne(Review);
exports.deleteReview = crud.deleteOne(Review);
