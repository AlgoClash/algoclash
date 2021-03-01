const User = require('../models/User')

exports.signupUser = (req, res, next) => {
  const newUser = req.body;

  User.create(newUser)
  .then(data => console.log('new user created ------->', data))
}