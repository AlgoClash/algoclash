const User = require('../models/User')

exports.signupUser = (req, res, next) => {
  const newUser = req.body;

  User.create(newUser)
  .then(data => {
    console.log('USER CREATED----->', data)
    res.locals.username = data.username;
    next();
  })
  .catch(err => {
    const errorObj = {
      message: `Error in userController: error creating user in DB: ${err}`,
      log: 'Error in userController.postLogin. Check error error logs'  
    }
    next(errorObj);
  });
};

// verify user's login credentials --->
exports.verifyUser =(req, res, next)=>{
  const userLogin = req.body;
  User.findOne(userLogin)
  .then(data => {
    if (data === null) return res.redirect('/user/register');
    console.log('VERIFY USER DATA---->', data);
    res.locals.username = data.username;
    next();
  })
  .catch(err => {
    const errorObj = {
      message: `Error in user.verifyUser: error creating user in DB: ${err}`,
      log: 'Error in userController.verifyUser. Check error error logs'
    };
    next(errorObj);
  });
};