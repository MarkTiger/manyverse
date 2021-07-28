const express = require("express")
const session = require("express-session")
const router = require("./routes")

const app = express()
const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(session({
  secret: 'saltedegg',
  resave: false,
  saveUninitialized: true
}))

app.use(router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})