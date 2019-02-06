const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const db = require('../models');


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
    password: password.trim()
  };

  // find a user by email address

  db.user.findOne({
    where: {
      email: userData.email
    }
  })
  .then(user =>  {
    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }
    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePasswords(userData.password, (passwordErr, isMatch) => {
      if (passwordErr) { return done(passwordErr); }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id
      };

      // create a token string
      const token = jwt.sign(payload, "a secret phrase!!");
      const data = {
        name: user.name,
        user_type: user.user_type,
      };
      // if everything is good, save to request for use in other routes
      return done(null, token, data);
    });
  })
  .catch(err => {
    return done(err);
  })
});