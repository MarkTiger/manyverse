const { User } = require("../models")

class Controller {
  static manyChat(req, res) {
    const userId = req.session.userId

    User.findByPk(userId, {
      attributes: [
        "first_name",
        "last_name",
        "status"
      ]
    })
      .then(user => {
        console.log(user)
        res.render("manyChat", {
          user
        })
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = Controller