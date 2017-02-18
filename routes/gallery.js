const express = require('express');
const router = express.Router();
const db = require('../models');
const { User, Photo } = db;
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/new', (req, res) => {
  res.render('pages/new-photo');
});

router.get('/create', (req, res) => {
  res.render('pages/create-account');
});

router.post('/create', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then( user => {
      res.redirect('/');
    });
});

router.get('/:id', (req, res) => {
  Promise.all([
    Photo.findById(req.params.id),
    Photo.findAll({ limit: 3 })
    ])
      .then ( results => {
      res.render('pages/single-photo', {
        "photo": results[0], "photos": results[1]
      });
    });
});

router.get('/:id/edit', (req, res) => {
  Photo.findAll({
    where: {
      id: req.params.id
    }
  })
    .then ( photo => {
      res.render('pages/edit-photo', {
        "photo": photo
      });
    });
});

router.post('/new', (req, res) => {
  Photo.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
    .then( photos => {
      res.redirect('/');
    });
});

router.put('/:id', (req, res) => {
  Photo.update(
  { author: req.body.author,
    link: req.body.link,
    description: req.body.description
  },
  { where: {
      id: req.params.id
    }
  })
    .then( photo => {
      res.redirect('/');
    });
});

router.delete('/:id', (req, res) => {
  Photo.destroy(
  { where: {
    id: req.params.id
  }
})
  .then ( photo => {
    res.redirect('/');
  });
});

module.exports = router;