const express = require("express")
const Controller = require("../controllers/registerController")

const router = express.Router()

router.get("/", Controller.register)

router.post("/", Controller.registerPost)

module.exports = router