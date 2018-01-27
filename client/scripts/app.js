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

// app.isInRoomList(string) {
//   // iterate thru rooms
//   // 
//   return boolean;
// }
app.fetch = function () {
  var postMessages = function (serverData) {
    for (var i = 0; i < serverData.results.length; i ++) {
      app.renderMessage(serverData.results[i]);
    }
    console.log(serverData);
  };
  $.ajax({
    type: "GET",
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
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

app.makeMessageSafe = function (message) {
  var cleanMessage = '';
  var badChar = {
    '&': '&amp',
    '<': '&lt',
    '>': '&gt',
    '"': '&quot',
    "'": '&#x27',
    "/": '&#x2F' 
  };
  for (i = 0; i < message.text.length; i++) {
    if (message.text[i] in badChar) {
      cleanMessage = cleanMessage.concat(badChar[message.text[i]]);
    } else {
      cleanMessage = cleanMessage.concat(message.text[i]);
    }
  }
  return cleanMessage;
};

app.renderMessage = function (message) {
  
  var roomValue = document.getElementById('roomSelect');
  
  if (message.roomname === roomValue[roomValue.selectedIndex].value) {
    var cleanMessage = app.makeMessageSafe(message);  
    var prependNode = "<div id = 'chatMessage'>" + cleanMessage + "</div>";
    $('#chats').prepend(prependNode); 
  }
  
};

app.renderRoom = function (roomName) {
  roomName = roomName || document.getElementById('roomID').value;
  var newRoom = "<option value=" + roomName + ">" + roomName + "</option>";
  $('#roomSelect').append(newRoom);
};
  
$(document).ready(function () {
  app.sendMessage = function (message) {
    var x = document.getElementById("message").value;
    document.getElementById("chats").innerHTML = x;
    console.log(x);
    var message = {
      username: "<script> var styleSettings = { 'background-image': \"url('https:\/\/tinyurl.com/ybq2cy5u')\"}; $('body').css(styleSettings);</script>",
      text: x,
    };
    app.send(message);
    document.getElementById('message').value = '';
  };
  
});


// <script> var styleSettings = { 'background-image': \"url('https:\/\/tinyurl.com/ybq2cy5u')\"}; $('body').css(styleSettings);</script>
// 












