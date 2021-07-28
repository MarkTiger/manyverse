const { Post } = require("../models")

module.exports = function(req, res, next) {
  const postId = Number(req.params.id)
  const userId = req.session.userId

  Post.findOne({
    where: {
      id: postId,
      user_id: userId
    }
  })
    .then(post => {
      if (post) {
        next()
      } else {
        res.send("You do not have the permission to modify this post")
      }
    })
    .catch(err => {
      res.send(err)
    })
}