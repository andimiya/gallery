const express = require('express');
const router = express.Router();
const db = require('../models');
const { User, Photo } = db;
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/', (req, res) => {
  Photo.findAll()
    .then( (photos) => {
      res.render('pages/gallery', {
        "photos": photos
      });
    });
});

router.get('/:id', (req, res) => {
  Photo.findAll({
    where: {
      id: req.params.id
    }
  })
    .then ( (photo) => {
      res.render('pages/single-photo', {
        "photo": photo
      });
    });
});

router.get('/:id/edit', (req, res) => {
  console.log(req.params.id, 'req param id');
  Photo.findAll({
    where: {
      id: req.params.id
    }
  })
    .then ( (photo) => {
      res.render('pages/edit-photo', {
        "photo": photo
      });
    });
});

router.get('/new', (req, res) => {
  res.render('pages/new-photo');
});

router.post('/', (req, res) => {
  Photo.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
    .then( (photos) => {
      res.redirect('/gallery');
    });
});

router.put('/:id', (req, res) => {
  Photo.update(
  {
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  },
  {
    where: {
      id: req.params.id
    }
  })
    .then( (photo) => {
      res.redirect('/gallery');
    });
});

module.exports = router;