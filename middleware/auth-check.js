const jwt = require('jsonwebtoken');
const db = require('../models');


/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, "a secret phrase!!", (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return db.user.findOne({
      id: userId
    })
    .then(user => {
      req.jwtuser = {_id: userId};
      return next();
    })
    .catch(err => {
      return res.status(401).end();
    })
  });
};