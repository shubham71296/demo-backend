const { Server } = require('socket.io');

function initializeSocket(server) {
  const io = new Server(server, {
    cors: { origin: 'http://localhost:5173', credentials: true },
  });

  const users = {};

  io.on('connection', (socket) => {
    //console.log('User connected:', socket.id);  //User connected: nhdSxAXL3QucS2tRAAAD
    

    socket.on('join', (userId) => {
      //console.log('User joined11:', userId); //User joined11: 68663a45c1662ab4b8f6342e
      users[userId] = socket.id;
      //console.log('User joined22:', users); //User joined22: { '68663a45c1662ab4b8f6342e': 'nhdSxAXL3QucS2tRAAAD' }
      //console.log('User joined33:', Object.keys(users)); //User joined33: [ '68663a45c1662ab4b8f6342e' ]
      io.emit('onlineUsers', Object.keys(users)); //
    });
  
    
    socket.on('message', (data) => { 
      const { receiver } = data;
      socket.emit('message', data);
      if (receiver && users[receiver]) {
        socket.to(users[receiver]).emit('message', data);
        // io.to(socket.id).emit('message', data);
      }
    });

    socket.on('disconnect', () => {
      for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
    io.emit('onlineUsers', Object.keys(users));
    });
  });

  return io;
}

module.exports = initializeSocket; 