const express = require('express');
const session = require('express-session');
const errorHandler = require('./lib/errorHandler');
const redisStore = require('connect-redis')(session);
const handlebars = require('express-handlebars');
const app = express();
const bp = require('body-parser');
const db = require('./models');
const { User, Photo } = db;
const CONFIG = require('./config/config.json');
const passport = require('passport');
const setUsername = require('./lib/setUsername');
const flash = require('connect-flash');
const redisExpress = require('express-redis');

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
app.use(flash());

app.use(redisExpress);

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
  Promise.all([
    Photo.findAll({ limit: 1 }),
    Photo.findAll()
    ])
      .then( results => {
      res.render('pages/gallery', {
        "hero": results[0],
        "photos": results[1]
      })
      .catch( err => {
        res.render('pages/error');
      });
  });
});


app.listen(3000, function() {
  console.log('Listening on 3000');
  db.sequelize.sync();
});

module.exports = app;
