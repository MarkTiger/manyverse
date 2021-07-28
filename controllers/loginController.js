const { User } = require("../models")
const { checkPassword } = require("../helpers/hashPassword")

class Controller {
  static login(req, res) {
    const errMsg = req.query.err || null

    res.render("login", {
      errMsg
    })
  }

  static loginPost(req, res) {
    const {email, password} = req.body

    User.findOne({
      where: {
        email
      },
      attributes: [
        "id",
        "email",
        "password"
      ]
    })
      .then(user => {
        const errMsg = "Wrong email/password"
        if (user) {
          const isPassMatch = checkPassword(password, user.password)
          if (isPassMatch) {
            req.session.userId = user.id
            req.session.isLogin = true
            console.log(req.session)
            res.redirect("/")
          } else {
          res.redirect(`/login?err=${errMsg}`)
          }
        } else {
          res.redirect(`/login?err=${errMsg}`)
        }
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = Controller