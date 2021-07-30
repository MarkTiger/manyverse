const { User } = require("../models")

class Controller {
  static register(req, res) {
    const errMsg = req.query.err || null

    res.render("register", {
      errMsg
    })
  }

  static registerPost(req, res) {
    const {first_name, last_name, email, password} = req.body
    const formData = {
      first_name,
      last_name,
      email,
      password
    }

    User.create(formData)
      .then(newUser => {
        console.log(newUser)
        req.session.isLogin = true
        req.session.userId = newUser.id
        res.redirect("/")
      })
      .catch(err => {
        err = err.errors.map(error => error.message)
        res.redirect(`/register?err=${err.join(",")}`)
      })
  }
}

module.exports = Controller