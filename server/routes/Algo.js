const express = require('express');
const algoController = require('../controller/algoController');

const router = express.Router();

router.post('/', algoController.getAlgo, (req, res) => {
  return res.status(200).json(res.locals.algo);
});
// send POST request to /algo/admin endpoint if you want to add new algos to db
router.post('/admin', algoController.addAlgo, (req, res) => {
  return res.status(200).json(res.locals.algo);
});
// can add DELETE handler to /algo/admin if we want to add delete functionality

router.get('/getAllQuestions', algoController.getAll, (req, res) => {
  return res.status(200).json(res.locals.allAlgos);
})

module.exports = router;
