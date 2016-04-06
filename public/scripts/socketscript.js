var socket = io();
$(document).ready(function(){

  // Sets the nickname for the user and checks for any other instance of that nickname

  $('#setNick').submit(function(e){
      e.preventDefault();
      socket.emit('new user', $('#nickname').val(), function(data){
        if(data){
          $('.nickWrap').hide();
          $('.chatWrap').show();
        }
        else{
          $("#nickError").html('User exists!');
        }
      });
  });

  //Passes the contents of the chat to the server

  $('#form').submit(function(e){
    e.preventDefault();
    socket.emit('chat message', {msg:$('#m').val(), chkVal: $('#chk').is(":checked")});
    $('#m').val('');
  });

  //Pulls the users in the current session

  socket.on('usernames', function(data){
    var users = ''
    for(var i=0; i<data.length; i++){
      users += data[i] + '<br>';
    }
    $("#users").html(users);
  });

  //Displays the chat messages

  socket.on('new message', function(data){
    $('#chat').append('<b>' + data.nick +':' + '</b>' + ' ' +  data.chat + "<br>");
    $("#chat").animate({scrollTop:$("#chat")[0].scrollHeight},500);
  });
});
