const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bp = require('body-parser');
const CONFIG = require('../config/config.json');
const router = express.Router();
const flash = require('connect-flash');
const isAuth = require('../lib/isAuth');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models');
const { User } = db;

const sess = {
  secret: CONFIG.development.secret
};

//This new LocalStrategy is how passport authenticates
passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({
      where: {
        username: username,
      }
    })
      .then ((user) => {
        if (user === null) {
          console.log('user failed');
          // req.flash('login', 'Log in right now');
          // res.render('./pages/login', { message: req.flash('login') });
          return done(null, false, { message: 'Bad username' });
        } else {

          bcrypt.compare(password, user.password)
            .then(res => {
              if(res){
                return done(null, user);
              }
              else {
                console.log('invalid password');

                return done(null, false, { message: 'bad password'});
              }
            });
        }
      })
    .catch ((err) => {
      console.log('error: ', err);
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
  res.render('./pages/login', {
    messages: req.flash('account-created') });
});

router.get('/profile', (req, res) => {
  res.render('profile', { username: req.user.username });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // req.flash('login', 'Log in right now');
      // res.redirect('./pages/login', { message: req.flash('login') });

      return done(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/gallery');
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  //Passport attaches a logout method to 'req'
  req.logout();
  res.redirect('/login');
});


module.exports = router;