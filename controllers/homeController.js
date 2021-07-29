const { Post, LikedPost, User } = require("../models")
const formatDate = require("../helpers/formatDate")

class Controller {
  static getHome(req, res) {
    const userId = req.session.userId
    let user

    User.findByPk(userId, {
      attributes: [
        "first_name",
        "last_name",
        "status"
      ]
    })
      .then(userData => {
        user = userData
        
        return Post.getPostsWithLikeCount(User, LikedPost)
      })
      .then(posts => {
        res.render("index", {
          page: "home",
          user,
          posts,
          formatDate
        })
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = Controller