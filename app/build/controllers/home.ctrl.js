mainModule.controller('HomeCtrl', ['$scope', 'socketIoFctry', function ($scope, socketIoFctry) {
    
    var socket = socketIoFctry;
    
    var variables = {
        username: "",
        userHolder: {},
        isRegisteredUser: false,
        message: "",
        chatHolder: []
    };
    
    var functions = {
        
        registerUsername: function(){
            socket.emit('new user', variables.username);
            variables.username = "";
        },
        
        sendMessage: function(){
            
            socket.emit('send message', {
                msg: variables.message
            });
            
            variables.message = "";
        },
        
        socketReceivers: function(){
            
            socket.on('new message', function(data){
                variables.chatHolder.push(data);
            });
            
            socket.on('user registered', function(){
                variables.isRegisteredUser = true;
            });
            
            socket.on('get users', function(data){
                variables.userHolder = angular.copy(data);
            });
            
            socket.on('user exists', function(){
                variables.isRegisteredUser = false;
            });
        }
    };
    
    functions.socketReceivers();
    
    $scope.variables = variables;
    $scope.functions = functions;
    
}]);