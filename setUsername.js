
function setUsername(req, res, next) {
  if (req.user) {
    console.log(req.user.username, 'req user');
    res.locals.username = req.user.username;
    next();
  }
  else {
    res.locals.username = null;
    res.redirect('/login');
  }
}

module.exports = setUsername;