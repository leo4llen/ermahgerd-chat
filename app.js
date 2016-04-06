var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var nicknames = [];
var path = require('path');
var erm = require( path.resolve( __dirname, "./ermahgerdify.js" ) );

var port = process.env.PORT || 3000;

server.listen(port, function(){
  console.log('listening!');
});

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("new user", function(data, callback){
    if(nicknames.indexOf(data) != -1){
      callback(false)
    }
    else {
      callback(true);
      socket.nickname = data;
      nicknames.push(socket.nickname);
      io.emit('usernames', nicknames);

    }
  });
  socket.on('chat message', function(data){
    if(data.chkVal == true){
      io.emit('new message', {chat: erm(data.msg) , nick: socket.nickname});
    }
    else{
      io.emit('new message', {chat: data.msg , nick: socket.nickname});
    }
  });
  socket.on('disconnect', function(data){
    if(!socket.nickname) return;
    console.log('user disconnected');
    nicknames.splice(nicknames.indexOf(socket.nickname), 1);
    io.emit('usernames', nicknames);
  });





});
