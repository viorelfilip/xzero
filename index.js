import { isSaving, getPlayers, saveScore, saveMove, saveReset, gamesByUser } from '/xzero/data.js';

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
        disableContainer(game);
        let msgDraw = document.createElement('div');
        msgDraw.className = "draw";
        msgDraw.id = `msg${gameId}`;
        msgDraw.innerHTML="GAME DRAW!";
        let gameContainer = document.getElementById( `game_${gameId}`).querySelector('.container');
        gameContainer.appendChild(msgDraw);
       
    }
}

function winMsg(game){
    let idx = games.indexOf(game);
    let msgWin =  document.createElement('div');
    msgWin.className = "win";
    msgWin.id = `msg${idx}`;
    msgWin.innerHTML = "YOU WIN!!!";
    let gameContainer = document.getElementById(`game_${idx}`).querySelector('.container');
    gameContainer.appendChild(msgWin);
    
}
function loseMsg(game){
    let idx = games.indexOf(game);
    let msgLose =  document.createElement('div');
    msgLose.className = "lose";
    msgLose.id = `msg${idx}`;
    msgLose.innerHTML = "YOU LOSE!";
    let gameContainer = document.getElementById(`game_${idx}`).querySelector('.container');
    gameContainer.appendChild(msgLose);
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



        if (!game.active) waitPartnerMove(game);
        //button reset
        divState.innerHTML += `<button id="btn${idx}" onClick="reset(${idx})"style="width:230px; margin-left:22px;" class="btn btn-lg btn-primary" ${game.active ? 'disabled' : ''}>
        <i class="fa fa-fw fa-undo"></i> Reset</button>`;

        setPlayerState(game, true);
        setPlayerState(game)
        
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
        myTurn ? waitPlayerMove(game) : waitPartnerMove(game);
        if (!game.active) disableContainer(game);
        draw(game);
      
    } else {
        let partner = users.filter(u => u.id == (game.idUser1 == loggedUserId ? game.idUser2 : game.idUser1))[0];
        let scor = partner.id == game.idUser1 ? game.scorUser1 : game.scorUser2;
        let yourTurn = (game.nextMove == 'X' && game.userX != loggedUserId) ||
            (game.nextMove == 'O' && game.userX == loggedUserId);
        element.innerHTML = `${scor} > ${partner.email} ( ${yourTurn ? 'Your turn' : 'Wait'} )`;
        element.className = yourTurn ? "move-active" : "move-await";
        if (!game.active) disableContainer(game);


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
    enableContainer(game);
    let ele = document.getElementById(`msg${idx}`);
    if(ele){
        ele.remove();
    }
    
}

function scoreGame(game, cellValue) {
    conf.winsound.play();
    if (cellValue === 'X') {
        console.log(game.userX);
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
  //  draw(game);
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
        if (isSaving()) return;
        gamesByUser(loggedUserId)
            .then(response => response.json())
            .then(data => {
                if (isSaving()) return;
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

                    }
                })
            });
    }, 3000);
})()

window.clickCell = clickCell;
window.reset = reset;
window.onPlayerChange = onPlayerChange;