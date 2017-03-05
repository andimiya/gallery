const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const { User, Photo } = db;
const methodOverride = require('method-override');
const isAuth = require('../lib/isAuth');
const CONFIG = require('../config/config.json');
const saltRounds = CONFIG.development.saltRounds;
// const flash = require('connect-flash');

router.use(methodOverride('_method'));

router.get('/', (req, res) => {
  res.redirect('./');
});

router.get('/new', isAuth, (req, res) => {
  res.render('pages/new-photo', {
  });
});

router.get('/new-user', (req, res) => {
  res.render('pages/create-account');
});

router.get('/:id', (req, res) => {
  Promise.all([
    Photo.findById(req.params.id),
    Photo.findAll({ limit: 3 })
    ])
      .then ( results => {
      res.render('pages/detail-view', {
        "photo": results[0],
        "photos": results[1],
      })
      .catch( err => {
        res.render('pages/error');
      });
    });
});

router.get('/:id/edit', isAuth, (req, res) => {
  Photo.findAll({
    where: {
      id: req.params.id
    }
  })
    .then ( photo => {
      res.render('pages/edit-photo', {
        "photo": photo,
      });
    })
    .catch( err => {
      res.render('pages/error');
    });
});

router.post('/new', isAuth, (req, res) => {
  Photo.create({
    title: req.body.title,
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
    .then( photos => {
      res.redirect('/');
    })
    .catch( err => {
      res.render('pages/error');
    });
});

router.post('/new-user', (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        console.log('hash', hash);
        User.create({
          username: req.body.username,
          password: hash
        })
          .then( user => {
            // req.flash('account-created', 'Account has been created, log in!');
            res.redirect('/login');
          })
          .catch( err => {
            res.render('pages/error');
          });
    });
  });
});

router.put('/:id', isAuth, (req, res) => {
  Photo.update({
    title: req.body.title,
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  },
  { where: {
      id: req.params.id
    }
  })
    .then( photo => {
      res.redirect('/');
    })
    .catch( err => {
      res.render('pages/error');
    });
});

router.delete('/:id', isAuth, (req, res) => {
  Photo.destroy(
  { where: {
    id: req.params.id
  }
})
  .then ( photo => {
    res.redirect('/');
  })
  .catch( err => {
    res.render('pages/error');
  });
});

module.exports = router;
