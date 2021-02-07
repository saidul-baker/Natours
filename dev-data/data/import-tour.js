/* eslint-disable prettier/prettier */
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModels");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database connected"));

const tours = JSON.parse(
  fs.readFileSync("./dev-data/data/tours-simple.json", "utf-8")
);

const importTours = async () => {
  try {
    await Tour.create(tours);
    console.log("Tours created from json file");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteAllTours = async () => {
  try {
    await Tour.deleteMany();
    console.log("Tours deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importTours();
} else if (process.argv[2] === "--delete") {
  deleteAllTours();
}
//console.log(process.argv);
