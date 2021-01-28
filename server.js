const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(app.get('env'));
//console.log(process.env);

app.listen(3000, function () {
  console.log('port started on 3000 ...');
});
