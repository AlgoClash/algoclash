const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')

router.post('/signup', userController.signupUser, (req, res) => {
  res.status(200).json(res.locals.username);
})

router.get('/verify', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.verify);
})

module.exports = router;