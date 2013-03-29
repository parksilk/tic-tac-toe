var io = require('socket.io').listen(8888);
var games = [];

io.sockets.on('connection', function (socket) {
  socket.on('login', function(username) {
    console.log("User " + username + " logged in");
    socket.set('username', username, function() {
      console.log("Broadcasting loggedin");
      io.sockets.emit('loggedin', username);
      io.sockets.emit('games', games);
    });

    socket.on('start', function() {
      socket.get('username', function(err, username) {
        socket.join(username);
        socket.set('hostname', username, function() {
          io.sockets.emit('new_game', username);
          games.push(username);
          io.sockets.emit('games', games);
        });
      });
    });

    socket.on('join', function(hostname) {
      socket.join(hostname);
      socket.set('hostname', hostname, function() {
        io.sockets.in(hostname).emit('joined', username);
        remove_game(username, games);
        io.sockets.emit('games', games);
      });
    });
    
    socket.on('move', function(x) {
      socket.get('username', function(err, username) { 
        socket.get('hostname', function(err, hostname) {
          io.sockets.in(hostname).emit('move', username, x);
        });
      });
    });

    socket.on('leave', function() {
      leave();
    });

    socket.on('disconnect', function() {
      socket.get('username', function(err, username) {
        leave();
        io.sockets.emit('loggedout', username);
      })
    });

    function leave() {
      socket.get('username', function(err, username) {
        socket.get('hostname', function(err, hostname) {
          io.sockets.in(hostname).emit('left', username);
        });
      });
    }

    function remove_game(game, games) {
      index = games.indexOf(game);
      games.splice(index);
    }
  });
});
