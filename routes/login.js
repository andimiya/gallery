const express = require('express');
const path = require('path');
const bp = require('body-parser');
const CONFIG = require('../config/config.json');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(bp.urlencoded({extended: true}));

app.use(session({
  secret: CONFIG.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

const authenticate = (username, password) => {
  // get user data from the DB
  const { USERNAME } = CONFIG;
  const { PASSWORD } = CONFIG;

  // check if the user is authenticated or not
  return ( username === USERNAME && password === PASSWORD );
};

//This new LocalStrategy is how passport authenticates
passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log('username, password: ', username, password);
    // check if the user is authenticated or not
    if( authenticate(username, password) ) {
      console.log('passed');

      // User data from the DB
      const user = {
        name: 'Joe',
        role: 'admin',
        favColor: 'green',
        isAdmin: true,
      };

      return done(null, user); // no error, and data = user
    }
    return done(null, false); // error and authenticted = false
  }
));

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

app.get('/login', (req, res) => {
  res.render('./pages/login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}));



module.exports = app;