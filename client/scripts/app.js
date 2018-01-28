var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'
};

app.init = function (username) {
  let url = new URL(window.location.href);
};

app.send = function (message) {
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
};

app.fetch = function () {
  app.clearMessages();
  var postMessages = function (serverData) {
    console.log(serverData);
    for (var i = serverData.results.length - 1; i >= 0; i--) {
      app.renderMessage(serverData.results[i]);
    }
  };
  $.ajax({
    type: "GET",
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    success: postMessages,
    data: {'order': '-createdAt'},
    error: function (data) {
      console.error('chatterbox: Failed to get message');
    }
  });
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
  if (message === undefined) { return; }
  for (i = 0; i < message.length; i++) {
    if (message[i] in badChar) {
      cleanMessage = cleanMessage.concat(badChar[message[i]]);
    } else {
      cleanMessage = cleanMessage.concat(message[i]);
    }
  }
  return cleanMessage;
};

app.renderMessage = function (message) {
  var userName = message.username;
  if (userName === undefined || userName === '') {
    userName = 'anonymous';
  }
  var roomValue = document.getElementById('roomSelect');
  var selectedRoom = roomValue[roomValue.selectedIndex].value;
  
  if (message.roomname === selectedRoom || selectedRoom === 'Lobby') {
    var cleanMessage = app.makeMessageSafe(message.text);  
    var prependMessage = "<div class = 'username chatMessage " + userName + "' " + "data-user="+ userName + " >" +  userName +  " sent:  <br>" + cleanMessage + "</div>";
    $('#chats').prepend(prependMessage); 
  }
  
};

app.renderRoom = function (roomName) {
  roomName = roomName || document.getElementById('roomID').value;
  if (roomName.length === 0) { return; }
  var newRoom = "<option value=" + roomName + " selected>" + roomName + "</option>";
  $('#roomSelect').append(newRoom);
  app.fetch();
  document.getElementById('roomID').value = '';
};
  
$(document).ready(function () {
  app.sendMessage = function (message) {
    var x = document.getElementById("message").value;
    var url = new URL(window.location.href);
    var roomValue = document.getElementById('roomSelect');
    var user = app.makeMessageSafe(url.searchParams.get('username').toString());
    var selectedRoom = roomValue[roomValue.selectedIndex].value;
    var message = {
      username: user,
      text: x,
      roomname: selectedRoom
    };
    app.send(message);
    app.fetch();
    document.getElementById('message').value = '';
  };
  document.getElementById("roomID").onchange = function () {
    app.clearMessages();
    app.fetch();
  };
  $(document.body).on('click', '.username', function () {
    var styleSettings = {
      'font-weight': 800,
    };
    var user = $(this).data('user');
    $('.' + user).css(styleSettings);
  });
});

