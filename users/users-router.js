const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkRole('admin'), (req, res) => {
  Users.find()
    .then(users => {
      res.json({users, user: req.user});
    })
    .catch(err => res.send(err));
});

function checkRole(role) {
  return function(req, res, next) {
    if (req.user) {
      if(req.user.roles && req.user.roles.includes(role)) {
        next()
      } else {
        res.status(403).json({message: 'You dont have the right role'})
      }
    } else {
      res.status(401).json({message: 'you can not pass'})
    }
  }
}

module.exports = router;
