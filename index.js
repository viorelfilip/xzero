let loggedUser = 1; // utilizatorul conectat in aplicatie
let users = [ // lista completa de jucatori
    { id: 1, email: 'viorelfilip@outlook.com' },
    { id: 2, email: 'emeric.lacatus@gmail.com' },
    { id: 3, email: 'ioana.pop@gmail.com' }
];

let conf = {
    cells: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ocolor: 'lightskyblue',
    xcolor: 'lightsalmon',
    dcolor: 'azure',
    winsound: new Audio("win-sound.mp3"),
    defsound: new Audio("def-sound.mp3")
}

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
    },
    {
        id: 2,
        idUser1: 1,
        idUser2: 3,
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

function showData() {
    document.getElementById('loadData').style.display = "none";
    //document.getElementById('score').style.display = "";
    showGames();
    showLoggedUser();
}

function showLoggedUser() {
    let el = document.getElementsByClassName("loggedUser")[0];
    el.innerHTML = 'Player: ' + users.filter(u => u.id === loggedUser)[0].email;
}

function grid(game) {
    let idx = games.indexOf(game);
    let el = document.createElement('div');
    el.className = "container";
    conf.cells.forEach(i => {
        el.innerHTML += `<div id="c${i}_${idx}" onClick="clickCell(this,${idx})" class="game-cell" style="background-color: ${conf.dcolor}">${game.c1 || ''}</div>`;
    })
    el.innerHTML += `<button onClick="reset(${idx})" class="btn btn-lg btn-primary"><i class="fa fa-fw fa-undo"></i> Reset</button>`;
    return el;
}

function showGames() {
    for (let game of games) {
        // let players = document.getElementsByClassName("players")[0];
        let gameContainer = document.getElementById("gameContainer");
        //let gameContainer = document.createElement('div');

        let opUser = (game.idUser1 === loggedUser ? game.idUser2 : game.idUser1);
        let email = users.filter(u => u.id === opUser)[0].email;
        //players.innerHTML = `<p> Opposite player : ${email}</p>`;

        let player = document.createElement('p');
        player.innerHTML = `<p style="text-align:center;"> Opposite player : ${email}</p>`;

        let score = document.createElement('p');
        score.innerHTML = `Score:
        X:<span id="playerX"> 0 </span>
        O:<span id="playerO" > 0 </span>`;

        gameContainer.appendChild(player);
        gameContainer.appendChild(score);
        gameContainer.appendChild(grid(game));
    }
}

function playerWin(game) {
    let wins = ['OOO', 'XXX'];
    if (~wins.indexOf(game.c1 + game.c2 + game.c3)) {
        scoreGame(game);
    }
    if (~wins.indexOf(game.c1 + game.c4 + game.c7)) {
        scoreGame(game);
    }
    if (~wins.indexOf(game.c1 + game.c5 + game.c9)) {
        scoreGame(game);
    }
    if (~wins.indexOf(game.c2 + game.c5 + game.c8)) {
        scoreGame(game);
    }
    if (~wins.indexOf(game.c3 + game.c6 + game.c9)) {
        scoreGame(game);
    }
    if (~wins.indexOf(game.c3 + game.c5 + game.c7)) {
        scoreGame(game);
    }
    if (~wins.indexOf(game.c4 + game.c5 + game.c6)) {
        scoreGame(game);
    }
    if (~wins.indexOf(game.c7 + game.c8 + game.c9)) {
        scoreGame(game);
    }
    conf.defsound.play();
}

function reset(idx) {
    let game = games[idx];
    conf
        .cells
        .forEach(i => {
            game[`c${i}`] = null;
            let el = document.getElementById(`c${i}_${idx}`);
            el.innerHTML = '';
            el.innerText = '';
            el.style.backgroundColor = conf.dcolor;
        })
}

function scoreGame(game) {
    conf.winsound.play();
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

function clickCell(cell, idx) {
    if (cell.innerHTML === 'X' || cell.innerHTML === 'O') {
        return;
    }
    let game = games[idx];
    game.nextMove = game.nextMove === 'X' ? 'O' : 'X';
    let symbol = game.nextMove;
    cell.style.backgroundColor = symbol == "X" ? conf.xcolor : conf.ocolor;
    cell.innerHTML = symbol;
    game[cell.id.split('_')[0]] = symbol;
    playerWin(game);
}
