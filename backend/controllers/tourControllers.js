
const sharp = require('sharp');
const multer = require('multer');

const Tour = require('../models/tourModel');
const crud = require('../controllers/genericCrud');
const AppError = require('./../utils/customError');
const catchAsync = require('./../utils/catchAsync');
const { findById } = require('../models/userModel');


exports.createTour = crud.create(Tour);
exports.getOneTour = crud.getOne(Tour); //"reviews"
exports.getAllTours = crud.getAll(Tour);
exports.updateOneTour = crud.updateOne(Tour);
exports.deleteOneTour = crud.deleteOne(Tour);

exports.getPlacesBasedOnTour = catchAsync(async (req, res, next) => {
    const tour = await findById(req.params.id)

    if (!tour) {
        return new customError(400, 'no Tour available')
    }
    const doc = await Place.find({ tourName: tour.name });

    res.status(200).json({
        status: 'ok',
        data: doc
    });
});

exports.getReviewsOfTheTour = catchAsync(async (req, res, next) => {
    const tour = await findById(req.params.id)

    if (!tour) {
        return new customError(400, 'No Tour available of this name')
    }
    let doc = await Review.find({ tour: req.params.id });

    if (!doc) doc = 'There is no Review, Be the First one to review!';

    res.status(200).json({
        status: 'ok',
        data: doc
    });
});

exports.excludeUnnecessary = (req, res, next) => {
    req.query.fields = '-__v,-createdAt,';
    next();
};


exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '6';
    req.query.sort = '-ratingsAverage,travelPackage';
    next();
};

exports.aliasTourThisMonth = crud.specifitMonthTour(Tour, new Date().getMonth() + 1);
exports.aliasTourNextMonth = crud.specifitMonthTour(Tour, new Date().getMonth() + 2);


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};


const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadTourImages = upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 3 }
]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
    if (!req.files.imageCover || !req.files.images) return next();

    // 1) Cover image
    req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${req.body.imageCover}`);

    // 2) Images
    req.body.images = [];

    await Promise.all(
        req.files.images.map(async (file, i) => {
            const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

            await sharp(file.buffer)
                .resize(2000, 1333)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/img/tours/${filename}`);

            req.body.images.push(filename);
        })
    );
    next();
});

