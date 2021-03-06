/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
  },

  slug: String,
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must define a max group size"],
  },

  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a summary"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a image cover"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

//Mongoose middleware

//document middleware
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});
// tourSchema.post("save", function (doc,next) {
//   console.log(doc);
//   next();
// });

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
