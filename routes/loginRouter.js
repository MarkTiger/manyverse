const express = require("express")
const Controller = require("../controllers/loginController")

const router = express.Router()

router.get("/", Controller.login)

router.post("/", Controller.loginPost)

module.exports = router