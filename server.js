const express = require('express');
const gallery = require('./routes/gallery');
const handlebars = require('express-handlebars');
const app = express();
const bp = require('body-parser');

const db = require('./models');
const { User, Photo } = db;

//bodyparser
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/gallery', gallery);

//handlebars
const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, function() {
  console.log('Listening on 3000');
  db.sequelize.sync();
});

module.exports = app;