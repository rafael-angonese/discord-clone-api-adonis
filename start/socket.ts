import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {

  console.log('\n----------- conectou ----------------');
  console.log(socket.id);
  console.log('---------------------------');

  // socket.emit('news', { hello: 'world' })

  socket.on('sendMessage', (data) => {
    console.log(data)
    socket.emit('newMessage', data)
  })

  socket.on("disconnect", async () => {
    console.log('\n----------- desconectou----------------');
    console.log(socket.id);
    console.log('---------------------------');
  });
})
