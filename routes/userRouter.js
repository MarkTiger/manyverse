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

router.post("/post/:id/edit", isAuthorized, Controller.editPostPost)

router.get("/post/:id/delete", isAuthorized)

// router.post("/test", upload.single('test'), (req, res) => {
//   res.type("png").send(req.file)
// })

module.exports = router