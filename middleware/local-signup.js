const db = require('../models');
const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim(),
    user_type: req.body.user_type.trim(),
  };

  return db.user.create(userData)
  .then(user => {
    if(!user) {
      const error = new Error('Unable to create a user');
      error.name = 'UnableToCreateUser';
      return done(error);
    } else {
      const payload = {
        sub: user._id
      };

      // create a token string
      const token = jwt.sign(payload, "a secret phrase!!");
      const data = {
        name: user.name,
        user_type: user.user_type,
      };
      // if everything is good, save to request for use in other route
      return done(null, token, data);
    }
  })
  .catch(err => {
    return done(err);
  })
});