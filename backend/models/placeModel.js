const mongoose = require('mongoose');
const slugify = require('slugify');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [4, 'A tour name must have more or equal then 10 characters'],
    },
    info: {
      type: String,
      trim: true
    },
    images: [String],
    location: [String],
    coordinate: {
      type: Object,
      lat: Number,
      long: Number,
    },
    slug: String,
    // place: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Tour"
    // },
    // tourName: {
    //   type: String,
    //   required: [true, "A place must have a tour name"]
    // },
    coverImage: {
      type: String,
      required: [true, "A place must have a cover image"]
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
  },
);


placeSchema.pre('save', function (next) {

  this.slug = slugify(this.name, { lower: true });
  next();
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
