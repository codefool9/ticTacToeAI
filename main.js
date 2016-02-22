var data = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var players = [
    new AIPlayer("x", data),
    new Player("o", data)
];
var winner = false;


var activePlayer = null;
var board = document.querySelector(".board");
function next(index) {
    if (activePlayer === players[0]) {
        activePlayer = players[1];
    } else {
        activePlayer = players[0];
    }
    if(activePlayer instanceof AIPlayer) {
        activePlayer.turn();
    } else {
        activePlayer.select(index);
    }
    checkResults();
}
function onClickTile(index) {
    if (!data[index] && !winner) {
        //console.log(index);
        //console.log(data);
        next(index);
        next();
    }
}

function checkResults() {
    var name = activePlayer.name;
    if (winner) {
        return false;
    }
    for (var i = 0; i < activePlayer.answers.length; i += 1) {
        var a = activePlayer.answers[i];
        if (data[a[0]] === name && data[a[1]] === name && data[a[2]] === name) {
            console.log(name + " wins");
            winner = true;
            if(activePlayer instanceof AIPlayer) {
                document.querySelector(".loser").style.display = "block";
            } else {
                document.querySelector(".winner").style.display = "block";
            }
        }
        if (!winner && data.indexOf(0) === -1) {
            document.querySelector(".tie").style.display = "block";
        }

    }
}
function reset() {
    winner = false;
    for(var i = 0; i < data.length; i += 1) {
        data[i] = 0;
    }
    var children = board.children;
    for (var i = 0; i < children.length; i += 1) {
        if (children[i].classList.contains("x")) {
            children[i].classList.remove("x");
        }
        if (children[i].classList.contains("o")) {
            children[i].classList.remove("o");
        }
    }
    document.querySelector(".winner").style.display = "none";
    document.querySelector(".tie").style.display = "none";
    document.querySelector(".loser").style.display = "none";
}
next();