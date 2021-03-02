
const socket = io => {
  io.on('connection', client => {
    console.log('New Connection');

    client.on('disconnect', () => {
      console.log('user disconnected');
    });

  });
}
 
module.exports = socket;


// io.on('connection', (socket) => {
//   console.log('a user connected!');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });