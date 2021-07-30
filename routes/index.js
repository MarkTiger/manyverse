const express = require("express")
const homeRouter = require("./homeRouter")
const userRouter = require("./userRouter")
const postRouter = require("./postRouter")
const manyChatRouter = require("./manyChatRouter")
const loginRouter = require("./loginRouter")
const registerRouter = require("./registerRouter")
const Controller = require("../controllers")

const router = express.Router()

// Home / Dashboard Router
router.use("/", homeRouter)

// User Router
router.use("/user", userRouter)

// Post Router
router.use("/post", postRouter)

// ManyChat Router
router.use("/manychat", manyChatRouter)

// Login router
router.use("/login", loginRouter)

// Register router
router.use("/register", registerRouter)

// Handle unrouted url
router.use(Controller.notFound)

module.exports = router