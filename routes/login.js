const express = require('express');
const session = require('express-session');
const passport = require('passport');

const bp = require('body-parser');
const CONFIG = require('../config/config.json');
const app = express();

const auth = require('./isAuth');

const LocalStrategy = require('passport-local').Strategy;

app.use(bp.urlencoded({extended: true}));

console.log(CONFIG.development.secret);
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
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
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
  // takes the session hash and de-hashes it and checks if it's legit or not
  // Runs on every subsequent request
  return done(null, user);
});

app.get('/login', (req, res) => {
  res.render('./pages/login');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login',
  })
);

app.get('/logout', (req, res) => {
  //Passport attaches a logout method to 'req'
  req.logout();
  res.redirect('/login');
});

app.get('/secret', auth.isAuthenticated, (req, res) => {
  res.render('secret', { user: req.user });
});

module.exports = app;


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