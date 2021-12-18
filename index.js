const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")

const port = process.env.PORT || 5005

const io = new Server(server, {
  cors: {
    origin: [
      "https://zachs-ai-games.web.app/tic-tac-toe",
      "http://localhost:3000",
    ],
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

server.listen(port, () => {
  console.log(`listening on *: ${port}`)
})
