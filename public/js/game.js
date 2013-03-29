var socket = io.connect('http://localhost:8888');

function login(username) {
  socket.emit("login", username);
}

socket.on('loggedin', function(username) {
  console.log("User " + username + " logged in");
});

socket.on('loggedout', function(username) {
  console.log("User " + username + " logged out");
});
