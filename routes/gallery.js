const express = require('express');
const router = express.Router();
const db = require('../models');
const { User, Photo } = db;

router.get('/', (req, res) => {
  Photo.findAll()
    .then( (photos) => {
      res.render('pages/gallery', {
        "photos": photos
      });
    });
});

router.get('/id', (req, res) => {
  res.render('pages/single-photo');
});

router.get('/new', (req, res) => {
  res.render('pages/new-photo');
});

router.post('/', (req, res) => {
  console.log(req.body.photo);
  Photo.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
    .then(function (photo) {
      res.json(photo);
    });
});

module.exports = router;