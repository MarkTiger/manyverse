const exprses = require("express")
const isLogin = require("../middlewares/session")
const Controller = require("../controllers/homeController")

const router = exprses.Router()

router.get("/", isLogin, Controller.getHome)

module.exports = router