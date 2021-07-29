const {LikedPost} = require("../models")

class Controller {
  static like(req, res) {
    const postId = Number(req.params.id)
    const userId = req.session.userId

    LikedPost.likeThisYo(userId, postId)
      .then(() => {
        res.redirect(`/#post-${postId}`)
      })
      .catch(err => {
          console.log(err)
          res.send("There is an error when processing your request")
      })
  }
}

module.exports = Controller