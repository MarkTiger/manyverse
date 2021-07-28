module.exports = function(req, res, next) {
  if (req.session.isLogin) {
    next()
  } else {
    res.redirect("/login")
  }
}