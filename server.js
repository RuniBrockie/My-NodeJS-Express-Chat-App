var express = require('express');
var app = express();

app.use(express.static(__dirname));

var users = [];
var connections = [];

var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io')(server);

io.sockets.on('Connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    
    // Disconnect
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
});