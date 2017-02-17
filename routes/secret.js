const express = require('express');
const router = express.Router();

router.route('/secret')
  .get(isAuthenticated, (req, res) => {
  res.render('./pages/secret');
});

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    console.log('NOPE');
    res.redirect('/login');
  }
}

module.exports = router;