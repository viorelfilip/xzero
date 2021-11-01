import {isSaving, setNonActive, getPlayers, saveScore, saveMove, saveReset, gamesByUser } from '/xzero/data.js';

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
    ocolor: '#6495ED',
    xcolor: '#FF4500',
    dcolor: '#FFE4C4',
    winsound: new Audio("win-sound.mp3"),
    clicksound: new Audio("click-sound.mp3")
}


let games = [ // doar jocurile utilizatorului conectat
    {
        id: 1,
        idUser1: 1,
        idUser2: 2,
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

function onPlayerChange() {
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

//draw function
function draw(game) {
    const isFull = Object.values(game).every(c => c != null);//check if the grid is full
    if (isFull) {
        const gameId = games.indexOf(game);
        document.getElementById(`btn${gameId}`).disabled = false;
        //alert("Draw!");
        disableContainer(game);
    }
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
        let partner = document.createElement('p');
        partner.id = 'partner';

        divState.appendChild(current);
        divState.appendChild(partner);
        divState.appendChild(grid(game));
        gameContainer.appendChild(divState);

        setPlayerState(game, true);
        setPlayerState(game);

        if (!game.active) waitPartnerMove(game);
        //button reset
        divState.innerHTML += `<button id="btn${idx}" onClick="reset(${idx})" class="w-100 btn btn-lg btn-primary"}>
        <i class="fa fa-fw fa-undo"></i> Reset</button>`;
        draw(game);

      //  disableContainer(game);
    }
     
}

function setPlayerState(game, loggedUser = false) {
    let idx = games.indexOf(game);
    let element = document.getElementById(`game_${idx}`).querySelector(`#${loggedUser ? 'current' : 'partner'}`);
    if (loggedUser) {
        let scor = loggedUserId == game.idUser1 ? game.scorUser1 : game.scorUser2;
        let myTurn = (game.nextMove == 'X' && game.userX == loggedUserId) ||
            (game.nextMove == 'O' && game.userX != loggedUserId);
        element.innerHTML = `${scor} > You ( ${myTurn ? 'My turn' : 'Wait'} )`;
        element.className = myTurn ? "move-active" : "move-await";
        console.log(myTurn);
        myTurn ? waitPlayerMove(game) : waitPartnerMove(game);
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
    conf.clicksound.play();
}

// function drawGame(game){
//     if ((game.c1 == 'X' || game.c1 == 'O') && (game.c2 == 'X'
//         || game.c2 == 'O') && (game.c3 == 'X' || game.c3 == 'O') &&
//         (game.c4 == 'X' || game.c4 == 'O') && (game.c5 == 'X' ||
//         game.c5 == 'O') && (game.c6 == 'X' || game.c6 == 'O') &&
//         (game.c7 == 'X' || game.c7 == 'O') && game.c8 == 'X' ||
//         (game.c8 == 'O') && (game.c9 == 'X' || game.c9 == 'O')) {
//             setActive(game.id);
//     }
// }

function reset(idx) {
    let game = games[idx];
    conf
        .cells
        .forEach(i => {
            game[`c${i}`] = null;
            let gameEl = document.querySelector(`#game_${idx}`);
            //   console.log(gameEl);
            let cellEl = gameEl.querySelector(`#c${i}`);
            cellEl.innerHTML = '';
            cellEl.innerText = '';
            cellEl.style.backgroundColor = conf.dcolor;
        })
    saveReset(game.id);
    enableContainer(game);
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
    disableContainer(game);
    saveScore(game.scorUser1, game.scorUser2, game.id);
    //console.log(game);
    game['active'] = false;
    setNonActive(game.id);

  //  console.log(game);
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
    playerWin(game);
    draw(game);
    game.nextMove = game.nextMove === 'X' ? 'O' : 'X';
    saveMove(cell.id, symbol, game.id);
    let gameEl = document.querySelector(`#game_${idx}`);
    setPlayerState(game, true);
    setPlayerState(game);
}

function disableContainer(game) {
    let idx = games.indexOf(game);
    let el = document.getElementById(`game_${idx}`).querySelector('.container');
    el.style.setProperty('pointer-events', 'none');
    el.style.setProperty('opacity', '50%');
    el.addEventListener('click', disableClick);
}

function enableContainer(game) {
    let idx = games.indexOf(game);
    let el = document.getElementById(`game_${idx}`).querySelector('.container');
    el.style['pointer-events'] = null;
    el.style['opacity'] = null;
    el.removeEventListener('click', disableClick);
}

// function waitPartnerMove(cell, game) {
//     for (let prop in game) {
//       //  console.log("nextMove " + game.nextMove, prop.substring(0, 1));
//         if (prop.substring(0, 1) === "c" && game[prop] === game.nextMove) {
//          //   console.log("prop: " + prop)
//             //let cell = document.getElementById(prop);
//             cell.style.setProperty('pointer-events', 'none');
//             cell.style.setProperty('opacity', '50%');
//             cell.addEventListener('click', disableClick);
//            // console.log(cell);
//         }
//     }
// }

function waitPartnerMove(game) {
    let idx = games.indexOf(game);
    let el = document.getElementById(`game_${idx}`).querySelector('.container');
    el.style.setProperty('pointer-events', 'none');
    el.style.setProperty('opacity', '50%');
    el.addEventListener('click', disableClick);
}

function waitPlayerMove(game) {
    let idx = games.indexOf(game);
    let el = document.getElementById(`game_${idx}`).querySelector('.container');
    el.style['pointer-events'] = null;
    el.style['opacity'] = null;
    el.removeEventListener('click', disableClick);
}

function setColor(symbol) {
    return symbol == "X" ? conf.xcolor : conf.ocolor;
}

(function () {
    setInterval(() => {
        if(isSaving()) return;
        gamesByUser(loggedUserId)
            .then(response => response.json())
            .then(data => {
                if(isSaving()) return;
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
                        setPlayerState(game, true);
                        setPlayerState(game);
                        playerWin(game);
                    }
                })
            });
    }, 3000);
})()

window.clickCell = clickCell;
window.reset = reset;
window.onPlayerChange = onPlayerChange;
