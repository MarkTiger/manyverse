const express = require("express")
const homeRouter = require("./homeRouter")
const loginRouter = require("./loginRouter")
const Controller = require("../controllers")

const router = express.Router()

// Home / Dashboard Router
router.use("/", homeRouter)

// Login router
router.use("/login", loginRouter)

// Handle unrouted url
router.use(Controller.notFound)

module.exports = router