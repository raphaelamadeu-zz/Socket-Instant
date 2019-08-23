const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
  socket.on('playSound', data => {
    socket.emit('playSound', data)
    socket.broadcast.emit('playSound', data)
  })
})

http.listen(3000, () => {
  console.log(`Server started on 3000`)
})
