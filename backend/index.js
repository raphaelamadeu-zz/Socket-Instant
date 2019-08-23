const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

const PORT = process.env.PORT || 3000
server.listen(PORT);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', socket => {
  socket.on('playSound', data => {
    socket.emit('playSound', data)
    socket.broadcast.emit('playSound', data)
  })
})
