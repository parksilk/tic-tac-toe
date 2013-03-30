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

function move(x, piece) {
  socket.emit('move', {pos: x, piece: piece});
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

socket.on('move', function(username, piece, x) {
  console.log("User " + username + " has moved at " + x);
  console.log(x);
  $('.' + x).text(piece);
});

socket.on('left', function(username) {
  console.log("User " + username + " has left the game");
});

socket.on('games', function(games) {
  $('ul#games').empty();
  for (var a = 0; a < games.length; a++) {
    $('ul#games').append('<li><a href="/game/' + games[a] + '/join">' + games[a] + '</a></li>');
  }
});
