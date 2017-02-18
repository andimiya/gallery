const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const app = express();
const bp = require('body-parser');
const db = require('./models');
const { User, Photo } = db;
const CONFIG = require('./config/config.json');
const passport = require('passport');

const gallery = require('./routes/gallery');
const login = require('./routes/login');

const sess = {
  secret: CONFIG.development.secret
};

//bodyparser
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

app.use('/gallery', gallery);
app.use('/', login);

//handlebars
const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
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