const { User, Post, LikedPost } = require("../models")
const cloudinary = require("../config/cloudinary")
const streamifier = require("streamifier")

class Controller {
  static getPosts(req, res) {
    const userId = req.session.userId
    let user

    User.findByPk(userId, {
      attributes: [
        "first_name",
        "last_name"
      ]
    })
      .then(userData => {
        user = userData
        
        return Post.getPostsWithLikeCount(User, LikedPost, userId)
      })
      .then(posts => {
        res.render("index", {
          page: "user",
          user,
          posts
        })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static newPost(req, res) {
    res.render("newPost")
  }

  static newPostPost(req, res) {
    const coverBuffer = req.file.buffer
    const { message } = req.body
    const user_id = req.session.userId


  const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
    console.log(error)
    console.log(result)

    const url = result.url
    const formData = {
      cover: url,
      message,
      user_id
    }

    Post.create(formData)
      .then(() => {
        res.redirect("/")
      })
      .catch(err => {
        res.send(err)
      })
  })

  streamifier.createReadStream(coverBuffer).pipe(uploadStream)
  }

  static editPost(req, res) {
    res.render("editPost")
  }

  static editPostPost(req, res) {

  }
}

module.exports = Controller