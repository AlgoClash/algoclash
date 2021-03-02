const User = require('../models/User')

exports.signupUser = (req, res, next) => {
  const newUser = req.body;

  console.log('usercontroller ---------->', newUser)

  User.create(newUser)
  .then(data => console.log('new user created ------->', data))
}