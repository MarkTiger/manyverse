const express = require("express")
const homeRouter = require("./homeRouter")
const userRouter = require("./userRouter")
const loginRouter = require("./loginRouter")
const Controller = require("../controllers")

const router = express.Router()

// Home / Dashboard Router
router.use("/", homeRouter)

// User Router

router.use("/user", userRouter)

// Login router
router.use("/login", loginRouter)

// Handle unrouted url
router.use(Controller.notFound)

module.exports = router