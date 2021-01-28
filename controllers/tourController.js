const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.checkId = function (req, res, next, val) {
  console.log('id checker middleware running');
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      messsage: 'Invalid id',
    });
  }
  next();
};

exports.checkBody = function (req, res, next) {
  console.log('post middleware running');
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'failed',
      messsage: 'Bad request',
    });
  }
  next();
};

exports.getAllTours = function (req, res) {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
};

exports.createNewTour = function (req, res) {
  //console.log(req.body);
  req.body.id = tours.length + 1;
  const newtour = req.body;
  tours.push(newtour);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    function (err) {
      if (err) console.log(err);
      else {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newtour,
          },
        });
      }
    }
  );
};

exports.getTour = function (req, res) {
  const id = parseInt(req.params.id);
  var tour;
  //console.log(id);

  for (let index = 0; index < tours.length; index++) {
    //console.log(tours[index]);
    if (id === tours[index].id) {
      tour = tours[index];
      break;
    }
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.updateTour = function (req, res) {
  const id = parseInt(req.params.id);
  var tourx;

  //console.log(id);

  for (let index = 0; index < tours.length; index++) {
    //console.log(tours[index]);
    if (id === tours[index].id) {
      tourx = tours[index];
      break;
    }
  }
  //tourx.duration = 15;
  //console.log(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      tour: tourx,
    },
  });
  // tours.push(tourx)
  // fs.writeFile(
  //   './dev-data/data/tours-simple.json',
  //   JSON.stringify(tours),
  //   function (err) {
  //     if (err) console.log(err);
  //     else {
  //       res.status(200).json({
  //         status: 'success',
  //         data: {
  //           tour: newtour,
  //         },
  //       });
  //     }
  //   }
  // );
};
exports.deleteTour = function (req, res) {
  const id = parseInt(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
