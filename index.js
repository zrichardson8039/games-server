const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    allowedHeaders: ["my-custom-header"],
    credentials: false,
  },
})

io.on("connection", (socket) => {
  console.log("user connected")
  socket.on("disconnect", () => {
    console.log("user disconnected")
  })

  socket.on("move", (board) => {
    console.log(board)
    io.emit("move", board)
  })
})

server.listen(5000, () => {
  console.log("listening on *:5000")
})
