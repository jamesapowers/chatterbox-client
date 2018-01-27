// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'
};
// $(document).ready(function () {

app.init = function (username) {
};
app.send = function (message) {
  //return true;
  $.ajax({
    type: "POST",
    url: "http://parse.sfm8.hackreactor.com/chatterbox/classes/messages",
    data: message,
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
  // $.post("http://parse.sfm8.hackreactor.com/", JSON.stringify(message), function (data) {return JSON.stringify(data);}, 'json');
};

app.isInRoomList(string) {
  // iterate thru rooms
  // 
  return boolean;
}
app.fetch = function () {
  var postMessages = function (serverData) {
    var rooms = document.getElementById('roomSelect');
    for (var i = 0; i < serverData.results.length; i ++) {
      if (serverData[i].roomname !== undefined) {
        //for loop through all the children
        for (var i = 0; i < rooms.length; i++) {
          // if (rooms[i] === )
        }
      }
      app.renderMessage(serverData.results[i]);
    }
    console.log(serverData);
  };
  $.ajax({
    type: "GET",
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    // data: JSON.stringify(),
    success: postMessages,
    error: function (data) {
      console.error('chatterbox: Failed to get message');
    }
  });
  return 1;
};

app.clearMessages = function () {
  $('#chats').html('');
};

app.renderMessage = function (message) {
  var roomValue = document.getElementById('roomSelect');
  if (roomValue[roomValue.selectedIndex].value === message.roomname || roomValue[roomValue.selectedIndex].value === "Lobby") {
    var prependNode = "<div id = 'chatMessage'>" + message.text + "</div>";
    $('#chats').prepend(prependNode);
  }  
};

app.renderRoom = function (roomName) {
  var newRoom = "<option value=" + roomName + ">" + roomName + "</option>";
  $('#roomSelect').append(newRoom);
};
  
$(document).ready(function () {
  app.sendMessage = function (message) {
    var x = document.getElementById("firstname").value;
    document.getElementById("chats").innerHTML = x;
    var message = {
      username: 'jeff',
      text: x,
      roomname: 'thisOne'
    };
    app.send(message);
    document.getElementById('firstname').value = '';
  };
});














