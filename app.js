const express = require("express")
const session = require("express-session")
const http = require("http")
const router = require("./routes")

const app = express()
const server = http.createServer(app)

const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use("/", express.static("public"))
app.use(session({
  secret: 'saltedegg',
  resave: false,
  saveUninitialized: true
}))

io.on('connection', (socket) => {
  socket.on('chat message', (chat) => {
    console.log(chat)
    io.emit('chat message', chat);
  });
});

app.use(router)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})