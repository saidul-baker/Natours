/* eslint-disable prettier/prettier */
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

// console.log(app.get('env'));
//console.log(process.env);

app.listen(3000, () => {
  console.log("port started on 3000 ...");
});
