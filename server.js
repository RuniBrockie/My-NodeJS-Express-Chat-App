var express = require('express');
var app = express();

app.use(express.static(__dirname));

var users = [];
var connections = [];

var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    
    updateUserNames();
    
    // Disconnect
    socket.on('disconnect', function(data){

        users.splice(users.indexOf(socket.username), 1);
        updateUserNames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });
    
    // Send Message
    socket.on('send message', function(data){
        console.log(data);
        io.sockets.emit('new message', {
            msg: data.msg,
            user: socket.username
        });
    });
    
    // New User
    socket.on('new user', function(data){
        console.log(data);
        var doesExist = checkIfUsernameExists(data);
        if (doesExist){
            return io.sockets.emit('user exists');
        }
        
        socket.username = data;
        users.push(socket.username);        
        io.sockets.emit('user registered');
        updateUserNames();
        
    });
    
    function checkIfUsernameExists(username){
        if (users.indexOf(username) !== -1){
            return true;
        }
        else{
            return false;
        }
    }
    
    function updateUserNames(){
        io.sockets.emit('get users', users);
    }
});