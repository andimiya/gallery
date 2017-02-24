const express = require('express');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const handlebars = require('express-handlebars');
const app = express();
const bp = require('body-parser');
const db = require('./models');
const { User, Photo } = db;
const CONFIG = require('./config/config.json');
const passport = require('passport');
const setUsername = require('./setUsername');
const errorHandler = require('./errorHandler');

const gallery = require('./routes/gallery');
const login = require('./routes/login');

const sess = {
  secret: CONFIG.development.secret
};

//bodyparser
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(errorHandler);

app.use(express.static('public'));

app.use(session({
  store: new redisStore(),
  secret: sess.secret
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/gallery', setUsername, gallery);
app.use('/', login);

//handlebars
const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', setUsername, (req, res) => {
  Photo.findAll()
    .then( photos => {
      res.render('pages/gallery', {
        "photos": photos
      });
    });
});

app.listen(3000, function() {
  console.log('Listening on 3000');
  db.sequelize.sync();
});

module.exports = app;