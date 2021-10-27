import { getPlayers, saveScore, saveMove, saveReset, gamesByUser } from '/xzero/data.js';

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
        c9: null,
        active: true
    }
];

let disableClick = (event) => {
    event.preventDefault();
}

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
                    showPlayers();
                })
            console.warn(data);
        });
}

function showPlayers() {
    let el = document.getElementById("players");
    el.innerHTML = '';    
    users.forEach(u => {
        el.innerHTML += `<option value="${u.id}" ${u.id == loggedUserId ? 'selected' : ''}>${u.email}</option>`;
    });
}

function onPlayerChange(){
    loggedUserId = +document.getElementById("players").value;
    document.getElementById('gameContainer').innerHTML = '';
    loadGames();
}

function grid(game) {
    let idx = games.indexOf(game);
    let el = document.createElement('div');
    el.className = "container";

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
        let gameContainer = document.getElementById("gameContainer");

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



        if (!game.active) waitPartnerMove(game);
        //button reset
        divState.innerHTML += `<button id="btn${idx}" onClick="reset(${idx})" class="w-100 btn btn-lg btn-primary" ${game.active ? 'disabled' : ''}>
        <i class="fa fa-fw fa-undo"></i> Reset</button>`;

    }

}

function setCellsDisable(game) {
    //     for(let prop in game){
    //       // console.log(game[prop]);
    //        if(game[prop] === 'X'){
    //         //    console.log(document.querySelector(prop));
    //         //    console.log("prop: " + prop)
    //             const cell = document.querySelector(prop);
    //             cell.disabled = true;
    //        } else {
    //             //document.getElementById(`c${i}`).disabled = false;
    //        }

    //        if(game[prop] === 'O'){
    //             //document.getElementById(prop).disabled = true;
    //        } else {
    //            // document.getElementById(`c${i}`).disabled = false;
    //        }
    //    };
}

function setPlayerState(element, game, loggedUser = false) {
    if (loggedUser) {
        let scor = loggedUserId == game.idUser1 ? game.scorUser1 : game.scorUser2;
        let myTurn = (game.nextMove == 'X' && game.userX == loggedUserId) ||
            (game.nextMove == 'O' && game.userX != loggedUserId);
        element.innerHTML = `${scor} > You ( ${myTurn ? 'My turn' : 'Wait'} )`;
        element.className = myTurn ? "move-active" : "move-await";
        console.log(myTurn);
        setCellsDisable(game);
    } else {
        let partner = users.filter(u => u.id == (game.idUser1 == loggedUserId ? game.idUser2 : game.idUser1))[0];
        let scor = partner.id == game.idUser1 ? game.scorUser1 : game.scorUser2;
        let yourTurn = (game.nextMove == 'X' && game.userX != loggedUserId) ||
            (game.nextMove == 'O' && game.userX == loggedUserId);
        element.innerHTML = `${scor} > ${partner.email} ( ${yourTurn ? 'Your turn' : 'Wait'} )`;
        element.className = yourTurn ? "move-active" : "move-await";
    }

}

function playerWin(game) {
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

function scoreGame(game, cellValue) {
    conf.winsound.play();
    if (cellValue === 'X') {
        if (game.idUser1 == game.userX) game.scorUser1++;
        else game.scorUser2++;
    } else {
        if (game.idUser1 == game.userX) game.scorUser2++;
        else game.scorUser1++;
    }
    const gameId = games.indexOf(game);
    document.getElementById(`btn${gameId}`).disabled = false;
    saveScore(game.scorUser1, game.scorUser2, game.id);
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
    waitPartnerMove(game);
}

function waitPartnerMove(game) {
    let idx = games.indexOf(game);
    let el = document.getElementById(`game_${idx}`).querySelector('.container');
    el.style.setProperty('pointer-events', 'none');
    el.style.setProperty('opacity', '50%');
    // el.style.setProperty('background-color', 'gray');
    el.addEventListener('click', disableClick);
}

function waitPlayerMove(game) {
    let idx = games.indexOf(game);
    let el = document.getElementById(`game_${idx}`).querySelector('.container');
    el.style['pointer-events'] = null;
    el.style['opacity'] = null;
    // el.style.setProperty('background-color', 'gray');
    el.removeEventListener('click', disableClick);
}

function setColor(symbol) {
    return symbol == "X" ? conf.xcolor : conf.ocolor;
}

(function () {
    setInterval(() => {
        gamesByUser(loggedUserId)
            .then(response => response.json())
            .then(data => {
                data.forEach(g => {
                    let game = games.filter(gm => gm.id == g.id)[0];
                    if (JSON.stringify(g) !== JSON.stringify(game)) {
                        Object.assign(game, g);
                        let idx = games.indexOf(game);
                        conf.cells.forEach(i => {
                            let propValue = game[`c${i}`];
                            let cell = document.getElementById(`game_${idx}`).querySelector(`#c${i}`);
                            cell.innerHTML = propValue || '';
                            cell.style['background-color'] = propValue === null ? conf.dcolor : setColor(propValue);
                        });
                    }
                })
            });
    }, 6000);
})()

window.clickCell = clickCell;
window.reset = reset;
window.onPlayerChange = onPlayerChange;