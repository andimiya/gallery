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

const authenticate = (username, password) => {
  // get user data from the DB
  const { USER } = CONFIG;
  const { PASSWORD, USERNAME } = USER;

  // check if the user is authenticated or not
  return ( username === USERNAME && password === PASSWORD );
};

//This new LocalStrategy is how passport authenticates
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ where: {username: username }})
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
  console.log(user);
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

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.get('/logout', (req, res) => {
  //Passport attaches a logout method to 'req'
  req.logout();
  res.redirect('/login');
});


module.exports = router;


// THIS IS NOT REAL CODE IT WILL BREAK SHIT
// app.post('/login', (req, res) => {
//   if (!req.body.email || !req.body.password) {
//     res.redirect('/login');
//   }

//   User.find({
//     email: req.body.email,
//     password: req.body.password,
//   })
//   .then((foundUser) => {
//     if (!foundUser) {
//       return res.redirect('/login');
//     }
//     const cookie = session.create(secret, req.user.pssword);


//   });
// });