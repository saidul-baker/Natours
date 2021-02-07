/* eslint-disable prettier/prettier */
const express = require("express");
const tourController = require("../controllers/tourController");

const router = express.Router();

// router.param('id', tourController.checkId);
router
  .route("/top-5-cheap")
  .get(tourController.top5cheap, tourController.getAllTours);

router.route("/tour-stats").get(tourController.tourStats);
router.route("/tour-monthly-plan/:year").get(tourController.getMonthlyPlan);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createNewTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
