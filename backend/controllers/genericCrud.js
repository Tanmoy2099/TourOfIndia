
const catchAsync = require('../utils/catchAsync');
const customError = require('./../utils/customError');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAll = Model =>
    catchAsync(async (req, res, next) => {
        // To allow for nested GET reviews on tour (hack)
        let filter = {};
        if (req.params.tourId) filter = { tour: req.params.tourId }; // tourId need in review tn

        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        // const doc = await features.query.explain();
        const doc = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'ok',
            results: doc.length,
            data: {
                data: doc
            }
        });
    });

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;

        if (!doc) {
            return next(new customError(404, 'No document found with that ID'));
        }

        res.status(200).json({
            status: 'ok',
            data: {
                data: doc
            }
        });
    });

exports.updateOne = Model => catchAsync(async (req, res, next) => {

    console.log(req.params.id)

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!doc) {
        return next(new customError(404, 'No document found with that ID'));
    }
    res.status(200).json({
        status: 'ok',
        data: doc
    });
});

exports.deleteOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new customError(404, 'No document found with that ID'));
    }

    res.status(200).json({
        status: 'ok',
        data: doc
    });
});

exports.create = Model => catchAsync(async (req, res, next) => {

    if (Model === "Tour") {
        req.body.name = req.nody.name[0].toUpperCase() + req.nody.name.substring(1).toLowerCase();
    }

    const doc = await Model.create(req.body);
    res.status(201).json({
        status: 'ok',
        data: doc
    });
});


exports.specifitMonthTour = (Model, month) => catchAsync(async (req, res, next) => {

    const doc = await Model.find({ monthToTravel: { $eq: month } });
    // const doc = await Tour.find({ monthToTravel: thisMonth }); //same

    res.status(200).json({
        status: 'ok',
        tourLength: doc.length,
        data: doc
    })
});