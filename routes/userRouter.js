const express = require("express")
const isLogin = require("../middlewares/session")
const isAuthorized = require("../middlewares/isAuthorized")
const Controller = require("../controllers/userController")

const multer = require("multer")
const upload = multer()

const router = express.Router()

router.use(isLogin)

router.get("/", Controller.getPosts)

router.get("/newpost", Controller.newPost)

router.post("/newpost", upload.single("cover"), Controller.newPostPost)

router.get("/post/:id/edit", isAuthorized, Controller.editPost)

router.post("/post/:id/edit", isAuthorized, upload.single("cover"), Controller.editPostPost)

router.get("/post/:id/delete", isAuthorized, Controller.deletePost)

router.get("/status", Controller.setStatus)

router.post("/status", Controller.setStatusPost)

router.get("/logout", Controller.logout)

module.exports = router