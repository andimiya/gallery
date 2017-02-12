var express = require('express');
const handlebars = require('handlebars');
var bp = require('body-parser');
var app = express();

var db = require('./models');

//bodyparser
app.use(bp.urlencoded({ extended: true }));

//handlebars
const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.listen(3000, function() {
  console.log('Listening on 3000');
  db.sequelize.sync();
});