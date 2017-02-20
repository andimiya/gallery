const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bp = require('body-parser');
const CONFIG = require('../config/config.json');
const router = express.Router();
const isAuth = require('../isAuth');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const { User } = db;

const sess = {
  secret: CONFIG.development.secret
};



//This new LocalStrategy is how passport authenticates
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ where: {
      username: username,
      password: password }})
      .then (function(user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username or password' });
        }
        return done(null, user);
      })
    .catch (function(err) {
      done(err);
    });
  }
));

//add a user to the db
passport.serializeUser((user, done) => {
  // User is passed in from Local Strategy - only runs when a user first authenticates
  // User's session has is hashed
  // User is attached to req.User
  return done(null, user);
});
passport.deserializeUser((user, done) => {
    return done(null, user);
  // takes the session hash and de-hashes it and checks if it's legit or not
  // Runs on every subsequent request
});

router.get('/login', (req, res) => {
  res.render('./pages/login');
});

router.get('/profile', (req, res) => {
  res.render('profile', { username: req.user.username });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.post('/logout', (req, res) => {
  //Passport attaches a logout method to 'req'
  req.logout();
  res.redirect('/login');
});


module.exports = router;