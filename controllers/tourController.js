/* eslint-disable prettier/prettier */
const Tour = require("../models/tourModels");
const APIfeatures = require("../utils/apiFeatures");

exports.top5cheap = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage price";
  req.query.fields = "name price ratingsAverage price summary description";
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //console.log(req.query);
    //Execute query
    const features = new APIfeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    const tours = await features.query;

    //Sending response
    res.status(200).json({
      status: "success",
      Number_of_Tours: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.createNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        updatedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "successfully deleted",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.tourStats = async (req, res) => {
  try {
    const tourStats = await Tour.aggregate([
      {
        $match: { price: { $gte: 200 } },
      },
      {
        $group: {
          _id: "$difficulty",
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        tourStats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numOfTours: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      {
        $addFields: { month: "$_id" },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numOfTours: -1 },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
