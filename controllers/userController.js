const { User, Post, LikedPost } = require("../models")
const formatDate = require("../helpers/formatDate")
const cloudinary = require("../config/cloudinary")
const streamifier = require("streamifier")

class Controller {
  static getPosts(req, res) {
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
        
        return Post.getPostsWithLikeCount(User, LikedPost, userId)
      })
      .then(posts => {
        res.render("index", {
          page: "user",
          user,
          posts,
          formatDate
        })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static newPost(req, res) {
    const userId = req.session.userId
    const errMsgs = req.query.err || null

    User.findByPk(userId, {
      attributes: [
        "first_name",
        "last_name",
        "status"
      ]
    })
      .then(user => {
        res.render("index", {
          page: "newPost",
          errMsgs,
          user
        })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static newPostPost(req, res) {
    const coverBuffer = req.file ? req.file.buffer : null
    const { message } = req.body
    const userId = req.session.userId

    if (coverBuffer) {
      const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        console.log(error)
        console.log(result)
    
        const url = result.url
        const formData = {
          cover: url,
          message,
          user_id: userId
        }
    
        Post.create(formData)
          .then(() => {
            res.redirect("/")
          })
          .catch(err => {
            err = err.errors.map(error => error.message)
            res.redirect(`/user/newpost?err=${err.join(",")}`)
          })
      })
    
      streamifier.createReadStream(coverBuffer).pipe(uploadStream)
    } else {
      const error = "Please select an image first"
      res.redirect(`/user/newpost?err=${error}`)
    }
  }

  static editPost(req, res) {
    const userId = req.session.userId
    const postId = Number(req.params.id)
    const errMsgs = req.query.err || null
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
        return Post.findByPk(postId)
      })
      .then(post => {
        res.render("index", {
          page: "editPost",
          post,
          errMsgs,
          user
        })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editPostPost(req, res) {
    const postId = Number(req.params.id)
    const userId = req.session.userId
    const { message, isChange } = req.body
    const formData = {
      message,
      user_id: userId
    }

    const coverBuffer = req.file ? req.file.buffer : null
    if (!coverBuffer && isChange) {
      const error = "Please select an image first"
      res.redirect(`/user/post/${postId}/edit?err=${error}`)
    } else if (isChange) {
      const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        console.log(error)
        console.log(result)
    
        const url = result.url
        formData.cover = url
    
        Post.update(formData, {
          where: {
            id: postId
          }
        })
          .then(() => {
            res.redirect("/user")
          })
          .catch(err => {
            err = err.errors.map(error => error.message)
            res.redirect(`/user/post/${postId}/edit?err=${err.join(",")}`)
          })
      })
      
      streamifier.createReadStream(coverBuffer).pipe(uploadStream)
    } else {
      Post.update(formData, {
        where: {
          id: postId
        }
      })
        .then(() => {
          res.redirect("/user")
        })
        .catch(err => {
          err = err.errors.map(error => error.message)
          res.redirect(`/user/post/${postId}/edit?err=${err.join(",")}`)
        })
    }
  }

  static deletePost(req, res) {
    const postId = req.params.id

    Post.destroy({
      where: {
        id: postId
      }
    })
      .then(() => {
        res.redirect("/user")
      })
      .catch(err => {
        res.send(err)
      })
  }

  static setStatus(req, res) {
    const userId = req.session.userId

    User.findByPk(userId, {
      attributes: [
        "first_name",
        "last_name",
        "status"
      ]
    })
      .then(user => {
        res.render("index", {
          page: "setStatus",
          user
        })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static setStatusPost(req, res) {
    const userId = req.session.userId
    const {status} = req.body
    const formData = {
      status
    }

    User.update(formData, {
      where: {
        id: userId
      }
    })
      .then(() => {
        res.redirect("/user")
      })
      .catch(err => {
        res.send(err)
      })
  }

  static logout(req, res) {
    delete req.session.isLogin
    delete req.session.userId
    res.redirect("/")
  }
}

module.exports = Controller