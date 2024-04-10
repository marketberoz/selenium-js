const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const ut = require('./ai.js');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    const words = msg.split(" ");
    switch (words[0]) {
      case 'cri':
        ut.cri(words[1],words[2],words[3],words[4],words[5]);
        break;
      case 'loi':
        ut.loi(words[1],words[2],words[3]);
        break;
      case 'fai':
        ut.mu(words[1],words[2],words[3]);
        break;
        case 'ana':
          ut.ana(words[1],words[2],words[3]);
          break;  
      case 'open':
          ut.open(words[1],words[2],words[3]);
          break;
      case 'apa':
            ut.apa(words[1],words[2],words[3]);
            break;      
      case 'lgo':
        ut.go(words[1],words[2],words[3]);
        break;
      default:
        io.emit('chat message', 'چی میگی زبون بسته');
    }
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});