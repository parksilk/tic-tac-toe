var socket = io.connect('http://localhost:8888');

//Emitions

function login(username) {
  socket.emit('login', username);
}

function start_game() {
  socket.emit('start');
}

function join_game(hostname) {
  socket.emit('join', hostname);
}

function move(x) {
  socket.emit('move', x);
}

// Listeners

socket.on('loggedin', function(username) {
  console.log("User " + username + " arrived");
});

socket.on('loggedout', function(username) {
  console.log("User " + username + " died");
});

socket.on('new_game', function(hostname) {
  console.log("User " + hostname + " has started a game")
});

socket.on('joined', function(username) {
  console.log("User " + username + " has joined your game")
});

socket.on('move', function(username, x) {
  console.log("User " + username + " has moved at " + x);
});

socket.on('left', function(username) {
  console.log("User " + username + " has left the game");
});
