import { getPlayers, saveMove, saveReset, gamesByUser } from '/xzero/data.js';

let loggedUserId = 1; // utilizatorul conectat in aplicatie
let users = [ // lista completa de jucatori
    { id: 1, email: 'viorelfilip@outlook.com' },
    { id: 2, email: 'emeric.lacatus@gmail.com' },
    { id: 3, email: 'ioana.pop@gmail.com' },
    { id: 4, email: 'ionut.popescu@gmail.com' },
    { id: 5, email: 'ana.ionescu@gmail.com' }
];

let conf = {
    cells: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ocolor: 'lightskyblue',
    xcolor: 'lightsalmon',
    dcolor: 'azure',
    winsound: new Audio("win-sound.mp3"),
    defsound: new Audio("def-sound.mp3")
}

let games = [ // doar jocurile utilizatorului conectat
    {
        id: 1,
        idUser1: 1,
        idUser2: 2,
        scorUser1: 0,
        scorUser2: 0,
        nextMove: "O",
        c1: "X",
        c2: null,
        c3: null,
        c4: null,
        c5: "O",
        c6: null,
        c7: null,
        c8: null,
        c9: null
    },
    {
        id: 2,
        idUser1: 1,
        idUser2: 3,
        scorUser1: 0,
        scorUser2: 0,
        nextMove: "X",
        c1: 'O',
        c2: null,
        c3: null,
        c4: null,
        c5: 'X',
        c6: null,
        c7: null,
        c8: 'X',
        c9: null
    },
    {
        id: 3,
        idUser1: 1,
        idUser2: 4,
        scorUser1: 0,
        scorUser2: 0,
        nextMove: "O",
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

export function loadGames() {
    gamesByUser(loggedUserId)
        .then(response => response.json())
        .then(data => {
            games = data;

            getPlayers()
                .then(response => response.json())
                .then(data => {
                    users = data;
                    showGames();
                    showLoggedUser();
                })
            console.warn(data);
        });
}

function showLoggedUser() {
    let el = document.getElementsByClassName("loggedUser")[0];
    el.innerHTML = 'Player: ' + users.filter(u => u.id === loggedUserId)[0].email;
}

function grid(game) {
    let idx = games.indexOf(game);
    let el = document.createElement('div');
    el.className = "container px-0";
    //config cell 
    conf.cells.forEach(i => {
        let propValue = game[`c${i}`];
        el.innerHTML += `<div id="c${i}" onClick="clickCell(this,${idx})" 
        class="game-cell" style="background-color: ${propValue === null ? conf.dcolor : setColor(propValue)}">
        ${propValue || ''} </div>`;
    })

    return el;

}

function showGames() {
    for (let game of games) {
        let idx = games.indexOf(game);
        // let players = document.getElementsByClassName("players")[0];
        let gameContainer = document.getElementById("gameContainer");
        //let gameContainer = document.createElement('div');

        let divState = document.createElement("div");
        divState.className = "status";
        divState.id = `game_${idx}`
        //opp player
        let opUser = (game.idUser1 === loggedUserId ? game.idUser2 : game.idUser1);
        let email = users.filter(u => u.id === opUser)[0].email;
        let current = document.createElement('p');
        current.id = 'current';
        setPlayerState(current, game, true);
        let partner = document.createElement('p');
        partner.id = 'partner';
        setPlayerState(partner, game)

        divState.appendChild(current);
        divState.appendChild(partner);

        divState.appendChild(grid(game));
        gameContainer.appendChild(divState);

        //button reset
        divState.innerHTML += `<button id="btn${idx}" onClick="reset(${idx})" class="w-100 btn btn-lg btn-primary" disabled>
        <i class="fa fa-fw fa-undo"></i> Reset</button>`;

    }

}

function setPlayerState(element, game, loggedUser = false) {
    if (loggedUser) {
        let scor = loggedUserId == game.idUser1 ? game.scorUser1 : game.scorUser2;
        let myTurn = (game.nextMove == 'X' && game.userX == loggedUserId) ||
            (game.nextMove == 'O' && game.userX != loggedUserId);
        element.innerHTML = `${scor} > You ( ${myTurn ? 'My turn' : 'Wait'} )`;
        element.className = myTurn ? "move-active" : "move-await";
    } else {
        let partner = users.filter(u => u.id == (game.idUser1 == loggedUserId ? game.idUser2 : game.idUser1))[0];
        let scor = partner.id == game.idUser1 ? game.scorUser1 : game.scorUser2;
        let yourTurn = (game.nextMove == 'X' && game.userX != loggedUserId) ||
            (game.nextMove == 'O' && game.userX == loggedUserId);
        element.innerHTML = `${scor} > ${partner.email} ( ${yourTurn ? 'Your turn' : 'Wait'} )`;
        element.className = yourTurn ? "move-active" : "move-await";
    }
}

function playerWin(game) { //aici ar trebui sa verificam cine a castigat. id1 sau id2 pt afisare scor.
    let wins = ['OOO', 'XXX'];
    if (~wins.indexOf(game.c1 + game.c2 + game.c3)) {
        scoreGame(game, game.c1);
    }
    if (~wins.indexOf(game.c1 + game.c4 + game.c7)) {
        scoreGame(game, game.c1);
    }
    if (~wins.indexOf(game.c1 + game.c5 + game.c9)) {
        scoreGame(game, game.c1);
    }
    if (~wins.indexOf(game.c2 + game.c5 + game.c8)) {
        scoreGame(game, game.c2);
    }
    if (~wins.indexOf(game.c3 + game.c6 + game.c9)) {
        scoreGame(game, game.c3);
    }
    if (~wins.indexOf(game.c3 + game.c5 + game.c7)) {
        scoreGame(game, game.c3);
    }
    if (~wins.indexOf(game.c4 + game.c5 + game.c6)) {
        scoreGame(game, game.c4);
    }
    if (~wins.indexOf(game.c7 + game.c8 + game.c9)) {
        scoreGame(game, game.c7);
    }
    conf.defsound.play();
}

function reset(idx) {
    let game = games[idx];
    conf
        .cells
        .forEach(i => {
            game[`c${i}`] = null;
            let gameEl = document.querySelector(`#game_${idx}`);
            let cellEl = gameEl.querySelector(`#c${i}`);
            cellEl.innerHTML = '';
            cellEl.innerText = '';
            cellEl.style.backgroundColor = conf.dcolor;
        })
    saveReset(game.id);
}

function scoreGame(game, cellValue) { //jucatorul curent verificam daca joaca cu x sau cu o,
    conf.winsound.play();             // in functie de id mergem in game si verificm daca id ul celui care a castigat sau a pierdut e egal cu jucatorul curent
    if (cellValue === 'X') {
        if (game.idUser1 == game.userX) game.scorUser1++;
        else game.scorUser2++;
    } else {
        if (game.idUser1 == game.userX) game.scorUser2++;
        else game.scorUser1++;
    }

    const gameId = games.indexOf(game);
    document.getElementById(`btn${gameId}`).disabled = false;

}

function clickCell(cell, idx) {
    if (cell.innerHTML === 'X' || cell.innerHTML === 'O') {
        return;
    }
    let game = games[idx];
    let symbol = game.nextMove;
    cell.innerHTML = symbol;
    cell.style.backgroundColor = setColor(symbol);
    game[cell.id] = symbol;
    game[cell.id] = symbol;
    playerWin(game);
    game.nextMove = game.nextMove === 'X' ? 'O' : 'X';
    saveMove(cell.id, symbol, game.id);
    let gameEl = document.querySelector(`#game_${idx}`);
    setPlayerState(gameEl.querySelector('#current'), game, true);
    setPlayerState(gameEl.querySelector('#partner'), game);
}

function setColor(symbol) {
    return symbol == "X" ? conf.xcolor : conf.ocolor;
}

//jocurile sa fie pe orizonatala; 
//butonul de reset enable si disabled; 
//afisare  player, score, cine urmeaza; 
//state in UI, jocul sa fie luat din baza de date la stadiul in care a ramas; 
//acoperire grid cu blur cand se castiga sau game over; 
//scorul afisat pt fiecare jucator;
//utilizatorul curent cu id1 are doua jocuri in asteptare: 1 in care el trebuie sa faca mutarea, 
// si al doilea in care sa astepte dupa jucator;
//afisare mesaj "turn of player x, sau turn of player o";
window.clickCell = clickCell;
window.reset = reset;
