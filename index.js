let loggedUser = 1; // utilizatorul conectat in aplicatie
let users = [ // lista completa de jucatori
    { id: 1, email: 'viorelfilip@outlook.com' },
    { id: 2, email: 'emeric.lacatus@gmail.com' }
];

let currPlayer = 1;

let playerX = 0;
let playerO = 0;

let games = [ // doar jocurile utilizatorului conectat
    {
        id: 1,
        idUser1: 1,
        idUser2: 2,
        c1: null,
        c2: null,
        c3: null,
        c4: null,
        c5: null,
        c6: null,
        c7: null,
        c8: null,
        c9: null 
    }
];

// const cloneGames = Object.assign({}, games);
// console.log(cloneGames);

function gameOver(){
    let game = games[0];
    let wins = ['OOO', 'XXX']
    if(~wins.indexOf(game.c1+game.c2+game.c3))
        return alert('Gata joc');
    if(~wins.indexOf(game.c4+game.c5+game.c6))
        return alert('Gata joc');
    if(~wins.indexOf(game.c7+game.c8+game.c9))
        return alert('Gata joc');
}

function showData() {
    document.getElementById('loadData').style.display = "none";
    document.getElementById('score').style.display = "";
    showGames();
    showLoggedUser();
}

function showLoggedUser() {
    let el = document.getElementsByClassName("loggedUser")[0];
    el.innerHTML = 'Player 1: ' + users.filter(u => u.id === loggedUser)[0].email;


}

function showGames() {
    let game = games[0];
    let el = document.getElementById('game');
    let players = document.getElementsByClassName("players")[0];


    let opUser1 = (game.idUser1 === loggedUser ? game.idUser2 : game.idUser1);
    let email = users.filter(u => u.id === opUser1)[0].email;
    players.innerHTML = `<p> Player 2: ${email}</p>`;


    el.innerHTML += `<div id="c1" onClick="clickCell(this)" class="game-cell">${game.c1 || ''}</div>`;
    el.innerHTML += `<div id="c2" onClick="clickCell(this)" class="game-cell">${game.c2 || ''}</div>`;
    el.innerHTML += `<div id="c3" onClick="clickCell(this)" class="game-cell">${game.c3 || ''}</div>`;
    el.innerHTML += `<div id="c4" onClick="clickCell(this)" class="game-cell">${game.c4 || ''}</div>`;
    el.innerHTML += `<div id="c5" onClick="clickCell(this)" class="game-cell">${game.c5 || ''}</div>`;
    el.innerHTML += `<div id="c6" onClick="clickCell(this)" class="game-cell">${game.c6 || ''}</div>`;
    el.innerHTML += `<div id="c7" onClick="clickCell(this)" class="game-cell">${game.c7 || ''}</div>`;
    el.innerHTML += `<div id="c8" onClick="clickCell(this)" class="game-cell">${game.c8 || ''}</div>`;
    el.innerHTML += `<div id="c9" onClick="clickCell(this)" class="game-cell">${game.c9 || ''}</div>`;


}


function playerWin() {

    let game = games[0];
    let wins = ['OOO', 'XXX'];
    console.log(currPlayer);

    if (~wins.indexOf(game.c1 + game.c2 + game.c3)) {
        alert(`Game over! Player ${currPlayer != 1 ? 'X' : 'O'} win! `);
        scoreGame();
        restartGame();
    }
    if (~wins.indexOf(game.c1 + game.c4 + game.c7)) {
        alert(`Game over! Player ${currPlayer != 1 ? 'X' : 'O'} win! `);
        scoreGame();
        restartGame();
    }
    if (~wins.indexOf(game.c1 + game.c5 + game.c9)) {
        alert(`Game over! Player ${currPlayer != 1 ? 'X' : 'O'} win! `);
        scoreGame();
        restartGame();
    }

    if (~wins.indexOf(game.c2 + game.c5 + game.c8)) {
        alert(`Game over! Player ${currPlayer != 1 ? 'X' : 'O'} win! `);
        scoreGame();
        restartGame();
    }
    if (~wins.indexOf(game.c3 + game.c6 + game.c9)) {
        alert(`Game over! Player ${currPlayer != 1 ? 'X' : 'O'} win! `);
        scoreGame();
        restartGame();
    }

    if (~wins.indexOf(game.c3 + game.c5 + game.c7)) {
        alert(`Game over! Player ${currPlayer != 1 ? 'X' : 'O'} win! `);
        scoreGame();
        restartGame();
    }
    if (~wins.indexOf(game.c4 + game.c5 + game.c6)) {
        alert(`Game over! Player ${currPlayer != 1 ? 'X' : 'O'} win! `);
        scoreGame();
        restartGame();
    }
    if (~wins.indexOf(game.c7 + game.c8 + game.c9)) {
        alert(`Game over! Player ${currPlayer != 1 ? 'X' : 'O'} win! `);
        scoreGame();
        restartGame();
    }
}

function restartGame() {
    for (let prop in games[0]) {
        if (prop != 'id' && prop != 'idUser1' && prop != 'idUser2') {
            games[0][prop] = null;
            console.log(games[0][prop]);
        }

    }
    document.getElementById('game').innerHTML = "";
    showData();
}


function scoreGame() {
    if (currPlayer != 1) {
        playerX++;
    } else {
        playerO++
    };
    document.getElementById('playerX').innerHTML = playerX;
    document.getElementById('playerO').innerHTML = playerO;

}
function getGames() {
    fetch('api/query.php?query=games-by-user&id=1')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(console.error);
}


function clickCell(cell) {

    if (cell.innerHTML === 'X' || cell.innerHTML === 'O') {
        return;
    }
    let symbol = "";
    if (currPlayer == 1) {
        symbol = "X";
        currPlayer = 2;
    } else {
        symbol = "O";
        currPlayer = 1;
    }
    if (symbol == "X") {
        cell.style.backgroundColor = "red";
    } else {
        symbol == "O";
        cell.style.backgroundColor = "blue";
    }

    cell.innerHTML = symbol;
    games[0][cell.id] = symbol;
    playerWin();


}





