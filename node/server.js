var io = require('socket.io').listen(8888);

io.sockets.on('connection', function (socket) {
  socket.on('login', function(username) {
    console.log("User " + username + " logged in");
    socket.set('username', username, function() {
      console.log("Broadcasting loggedin");
      io.sockets.emit('loggedin', username);
    });

    socket.on('start', function() {
      socket.get('username', function(err, username) {
        socket.join(username);
        socket.set('hostname', username, function() {
          io.sockets.emit('new_game', username);
        });
      });
    });

    socket.on('join', function(hostname) {
      socket.join(hostname);
      socket.set('hostname', hostname, function() {
        socket.in(hostname).emit('joined', username);
      });
    });
    
    socket.on('move', function(x) {
      socket.get('username', function(err, username) { 
        socket.get('hostname', function(err, hostname) {
          socket.in(hostname).emit('move', username, x);
        });
      });
    });

    socket.on('leave', function(token) {
      //leave the room
      //set game to lose if not finished
    });

    socket.on('disconnect', function() {
      socket.get('username', function(err, username) {
        io.sockets.emit('loggedout', username);
      })
    });
  });
});
