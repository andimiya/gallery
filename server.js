const express = require('express');
const gallery = require('./routes/gallery');
const login = require('./routes/login');
const secret = require('./routes/secret');
const handlebars = require('express-handlebars');
const app = express();
const bp = require('body-parser');

const db = require('./models');
const { User, Photo } = db;

//bodyparser
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', gallery);
app.use('/', login);
app.use('/', secret);

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