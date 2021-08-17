const io = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {
  const indexPath = path.join(__dirname, 'index.html');
  const readStream = fs.createReadStream(indexPath);
  readStream.pipe(response);
});

const socket = io(server);

socket.on('connection', client => {
  console.log('New client connected');
  client.broadcast.emit('NEW_CLIENT_CONNECTED');

  // socket.on('disconnect', client => {
  //   console.log('Client has been disconnected');
  //   client.broadcast.emit('CLIENT_DISCONNECTED');
  // });

  client.on('CLIENT_MSG', data => {
    const payload = {
      // message: data.message.split('').reverse().join('')
      message: data.message
    };
    client.emit('SERVER_MSG', payload);
    client.broadcast.emit('SERVER_MSG', payload);
  });
});

server.listen(3000);











  

