const express = require('express');
const router = express.Router();

router.get('/secret', isAuthenticated, (req, res) => {
  res.render('secret', { user: req.user });
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