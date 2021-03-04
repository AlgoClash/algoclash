const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const userRoute = require('./routes/User')
const algoRoute = require('./routes/Algo')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const MONGO_URI = 'mongodb+srv://Ian:CSmongo23@cluster0.z8sil.mongodb.net/AlgoClash?retryWrites=true&w=majority'

mongoose.connect( MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => console.log("connected to database"));

if (process.env.NODE_ENV === 'production') {

  console.log(path.join(__dirname, '../../dist'));

  app.use('/dist', express.static(path.join(__dirname, '../../dist')));
  
};

app.use('/user', userRoute);

app.use('/algo', algoRoute);

app.get('/', (_, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../../public/index.html'));
});
/* --- SOCKET.IO --- */

const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

const _Room = require('./Room');
const _Player = require('./Player');

const rooms = <any>[];

const Algo = require('./models/Algo')

io.on('connection', (socket) => {

  socket.on('connectClient', () => {
    socket.emit('connectSuccess', {socketID: socket.id});
  });

  socket.on('createRoom', ({roomID}) => {
    Algo.find({})
    .then(data => {

      const shuffled = data.sort(() => 0.5 - Math.random());
      let selected = shuffled.slice(0, 3);
      
      const newRoom: Room = new _Room(roomID, selected);
      rooms.push(newRoom);
      socket.emit('createSuccess', {roomID});
    })
    .catch(err => console.log(err));
  });

  socket.on('joinRoom', ({roomID, userID}) => {
    const targetRoom: number = rooms.findIndex(room => room.id === roomID);

    if (!rooms[targetRoom].players.some(player => player.id === userID)) {

      const newPlayer: Player = new _Player(userID);
      rooms[targetRoom].addPlayer(newPlayer);

      const totalPlayers: [] = rooms[targetRoom].players.reduce((acc, player) => {
        acc.push(player.id);
        return acc;
      }, []);

      socket.join(rooms[targetRoom].id);
      io.sockets.to(rooms[targetRoom].id).emit('playerJoined', {totalPlayers, roomQuestions: rooms[targetRoom].questions});
    }
  });

  socket.on('readyup', ({roomID}) => {
    const targetRoom: number = rooms.findIndex(room => room.id === roomID);
    const ready: number = rooms[targetRoom].readyup();

    if (ready === 2) io.sockets.to(rooms[targetRoom].id).emit('startGame', {});
    else socket.emit('readySuccess', {ready, roomSize: rooms[targetRoom].players.length});

  });

  socket.on('resetRound', ({roomID}) => {
    const targetRoom: number = rooms.findIndex(room => room.id === roomID);
    rooms[targetRoom].resetReady();
  });

  socket.on('keyDown', ({roomID, userID, code}) => {
    const targetRoom: number = rooms.findIndex(room => room.id === roomID);
    io.sockets.to(rooms[targetRoom].id).emit('writeCode', {userID, code});
  });

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });

  socket.on('ready', (data) => {
    console.log(data);
    socket.emit('ready2', {key: "returning the response"})
  });
});

// global error handler --->
app.use((err, _, res, next) => {
    const defaultErr = {
      log: `Express error handler caught unknown middleware error: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

httpServer.listen(PORT, () => console.log(`listening on: ${PORT}!`))