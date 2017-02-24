const express = require('express');
const router = express.Router();
const db = require('../models');
const { User, Photo } = db;
const methodOverride = require('method-override');
const isAuth = require('../isAuth');

router.use(methodOverride('_method'));

router.get('/', (req, res) => {
  Photo.findAll()
    .then( photos => {
      res.render('pages/gallery', {
        "photos": photos,
      });
    })
    .catch( err => {
      output.html('ERROR');
    });
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
    });
});

router.post('/new-user', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then( user => {
      res.redirect('/');
    });
});

router.put('/:id', isAuth, (req, res) => {
  Photo.update(
  { title: req.body.title,
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
  });
});

module.exports = router;