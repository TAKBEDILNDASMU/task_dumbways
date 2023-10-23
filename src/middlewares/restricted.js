module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next()
  } else {
    res.render("login", { layout: "index", errors: [{ message: "Login first !" }] })
  }
}
