var express = require('express');
const handlebars = require('express-handlebars');
var app = express();
var bp = require('body-parser');

var db = require('./models');

//bodyparser
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(express.static('public'));

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