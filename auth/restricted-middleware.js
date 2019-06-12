const jwt = require('jsonwebtoken')

const secrets = require('../config/secrets.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
      if(err) {
        //invalid token
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        // valid token
        req.user = { id: decodeToken.sub, roles: decodeToken.roles}
        next()
      }
    })
  } else {
    res.status(401).json({ message: 'No Token Provided' });
  }
}
