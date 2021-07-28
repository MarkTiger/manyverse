const exprses = require("express")
const isLogin = require("../middlewares/session")
const Controller = require("../controllers/homeController")

// const multer = require("multer")
// const upload = multer({dest: "uploads/"})

const router = exprses.Router()

router.get("/", isLogin, Controller.getHome)

// router.post("/test", upload.single('test'), (req, res) => {
//   res.type("png").send(req.file)
// })

module.exports = router