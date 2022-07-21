const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [80, 'A tour name must have less or equal then 40 characters'],
      minlength: [3, 'A tour name must have more or equal then 10 characters'],
    },
    state: {
      type: String,
      required: [true, "A place must be in some State"],
    },
    duration: {
      type: Number,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
      require: [true, 'A tour must have duration'],
    },
    slug: String,
    groupSizeMin: {
      type: Number,
      required: [true, 'A tour must have a minimum group size']
    },
    groupSizeMax: {
      type: Number,
      required: [true, 'A tour must have a maximum group size']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
    travelPackage: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    summery: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summery']
    },
    info: {
      type: String,
      trim: true
    },
    coverImage: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    monthToTravel: [{
      type: Number,
      min: 1,
      max: 12
    }],
    place: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Place',
      required: [true, "Tours must contain places"]
    }],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Virtual populate
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

// tourSchema.virtual('place', {
//   ref: "Place",
//   foreignField: 'place',
//   localField: '_id'

// })

tourSchema.pre(/^find/, function(next){
  this.populate({
    path:'place',
    select: '-__v -createdAt'
  })
  next();
})


tourSchema.pre('save', function (next) {
  const tempSlug = `${this.name} ${this.state} ${this.summery}`;
  this.slug = slugify(tempSlug, { lower: true });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
