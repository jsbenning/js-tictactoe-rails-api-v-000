// Code your JavaScript / jQuery solution here
var turn = 0;
var board = ['', '', '', '', '', '', '', '', ''];

function player() {
  if (turn % 2 == 0) {
    return "X";
  } else {
    return "O";
  }
}

function attachListeners() {
  const squares = window.document.querySelectorAll('td');
  for (var i = 0; i < 9; i++) {
    squares[i].onclick = function() {
      if (this.innerHTML !== "X" && this.innerHTML !== "O" ){
        doTurn(this);
      }     
    }
  }

  Array.prototype.contains = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) {
        return true;
      }
    }
    return false;
  }
  var gameButtons = document.getElementsByClassName("gameButton");
  var buttonIds = Array.prototype.map.call(gameButtons, function(el) { // this gathers all game button ids in an array
    return el.id;
  });
  $.ajax({
    type: 'GET',
    url: '/games',
    success: function(data) {
      $.each(data.data, function(i, item) {
        var game = data.data[i];
        //console.log(data.data[i].id);
        if (!(buttonIds.contains(game.id))) {
          var myButton = $('<button type="submit" class="gameButton" value=' + '"' + game.attributes.state + '"' + 'id=' + '"' + game.id + '"' + '>' + 'Game ' + game.id + '</button>');
          myButton.appendTo($('#games'));
        }
      })
    }
  })
  var clear = document.getElementById('clear');
}

function updateState(position) {
  position.innerHTML = player();
  const squares = window.document.querySelectorAll('td');
  for (var i = 0; i < 9; i++) {
    board[i] = squares[i].innerHTML;
  };
}

function message(string) {
  //var msg = window.document.getElementById('message');
  var msg = $('#message');
  msg.innerHTML = string;
}

function checkWinner() {
  var returnValue = false;
  var token = player();
  var winBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];
  for (var i = 0; i < winBoard.length; i++) {
    if (board[(winBoard[i][0])] == token && board[(winBoard[i][1])] == token && board[(winBoard[i][2])] == token) {
      var msg = "Player " + token + " Won!";
      message(msg);
      returnValue = true
      break;
    }
  }
  return returnValue;
}

function doTurn(position) {
  updateState(position);
  checkWinner();
  turn += 1;
  if (checkWinner() == false && turn == 9) {
    // board = ['', '', '', '', '', '', '', '', ''];
    // turn = 0;
    msg = "Tie game."
    message(msg);
  } else if (checkWinner() == true) {
    //console.log(checkWinner()) returns true, only within this condition
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 0;
    const squares = window.document.querySelectorAll('td');
    for (var i = 0; i < 9; i++) {
      squares[i].innerHTML = "";
    }
  }
}
window.onload = function() {
  attachListeners();
}