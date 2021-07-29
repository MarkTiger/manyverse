const express = require("express")
const isLogin = require("../middlewares/session")
const Controller = require("../controllers/postController")

const router = express.Router()

router.get("/:id/like", isLogin, Controller.like)

module.exports = router