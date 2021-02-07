/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

// console.log(app.get('env'));
//console.log(process.env);

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database connected"));

app.listen(3000, () => {
  console.log("port started on 3000 ...");
});
