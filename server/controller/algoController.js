const Algo = require('../models/Algo');

// get new algo from db
exports.getAlgo = (req, res, next) => {
  // user completed algos array sent from frontend
  const compAlgos = req.body;
  // if user has completed an algo in this session, find any algo NOT in the curAlgos array
  if (compAlgos.length) {
    console.log('completed algos array in algoController:', compAlgos);
    Algo.findOne({ 'algoName': { $nin: compAlgos } })
      .then((data) => {
        res.locals.algo = data;
        return next();
      })
      .catch((err) => {
        const errorObj = {
          message: `Error in algo.getAlgo: error creating user in DB: ${err}`,
          log: 'Error in algoController.getAlgo. Check error error logs',
        };
        return next(errorObj);
      });
  }
  // if user has not completed an algo in this session, find any algo
  Algo.findOne({})
    .then((data) => {
      res.locals.algo = data;
      return next();
    })
    .catch((err) => {
      const errorObj = {
        message: `Error in algo.getAlgo: error creating user in DB: ${err}`,
        log: 'Error in algoController.getAlgo. Check error error logs',
      };
      return next(errorObj);
    });
};
// add new algo to db
exports.addAlgo = (req, res, next) => {
  Algo.create(req.body)
    .then((data) => {
      // returns added algo object if successful
      res.locals.algo = data;
      return next();
    })
    .catch((err) => {
      const errorObj = {
        message: `Error in algo.addAlgo: error creating user in DB: ${err}`,
        log: 'Error in algoController.addAlgo. Check error error logs',
      };
      return next(errorObj);
    });
};

exports.getAll = (req, res, next) => {
  Algo.find({})
  .then(data => {
    res.locals.allAlgos = data
    next()
  })
};
