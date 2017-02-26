function errorHandler (err, req, res, next) {
  res.status(500);
  res.render('pages/error', { error: err });
}

module.exports = errorHandler;