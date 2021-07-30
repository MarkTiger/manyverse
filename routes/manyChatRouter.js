const express = require("express")
const isLogin = require("../middlewares/session")
const Controller = require("../controllers/manyChatController")

const router = express.Router()

router.get("/", isLogin, Controller.manyChat)

module.exports = router