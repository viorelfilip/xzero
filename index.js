let loggedUser = 1; // utilizatorul conectat in aplicatie
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

let currPlayer = "X";
let oppPlayer = "O";


let games = [ // doar jocurile utilizatorului conectat
    {
        id: 1,
        idUser1: 1,
        idUser2: 2,
        score: {
            scoreX: 0,
            scoreO: 0
        },
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
        score: {
            scoreX: 0,
            scoreO: 0
        },
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
        score: {
            scoreX: 0,
            scoreO: 0
        },
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
    },
    {
        id: 4,
        idUser1: 1,
        idUser2: 5,
        score: {
            scoreX: 0,
            scoreO: 0
        },
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



function showData() {
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

    //config cell 
    conf.cells.forEach(i => {
        let propValue = game[`c${i}`];
        el.innerHTML += `<div id="c${i}_${idx}" onClick="clickCell(this,${idx})" 
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

        //opp player
        let opUser = (game.idUser1 === loggedUser ? game.idUser2 : game.idUser1);
        let email = users.filter(u => u.id === opUser)[0].email;
        let player = document.createElement('p');
        player.innerHTML = `Player : ${email}`;
        divState.appendChild(player);

        //score
        let score = document.createElement('p');
        score.innerHTML = `Score:
            X:<span id="playerX${idx}"> 0 </span>
            O:<span id="playerO${idx}"> 0 </span>`;
        divState.appendChild(score);

        //state game
        let status = document.createElement("p");
        status.innerHTML = `It's turn of player: <span id="status${idx}">${game.nextMove === 'X' ? 'O' : 'X'}</span>`; 
        divState.appendChild(status);

        divState.appendChild(grid(game));
        gameContainer.appendChild(divState);
        
        //button reset
        divState.innerHTML += `<button id="btn${idx}" onClick="reset(${idx})" class="btn btn-lg btn-primary" disabled>
        <i class="fa fa-fw fa-undo"></i> Reset</button>`; 

    }

}


function playerWin(game) { //aici ar trebui sa verificam cine a castigat. id1 sau id2 pt afisare scor.
    let wins = ['OOO', 'XXX'];
    if (~wins.indexOf(game.c1 + game.c2 + game.c3)){
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
            let el = document.getElementById(`c${i}_${idx}`);
            el.innerHTML = '';
            el.innerText = '';
            el.style.backgroundColor = conf.dcolor;
        })
}

function scoreGame(game, cellValue) { //jucatorul curent verificam daca joaca cu x sau cu o,
    conf.winsound.play();             // in functie de id mergem in game si verificm daca id ul celui care a castigat sau a pierdut e egal cu jucatorul curent
    let idPlayer = cellValue === 'X' ? game.idUser1 : game.idUser2;        
    const gameId = games.indexOf(game);

    if(idPlayer === game?.idUser1){          
        game.score.scoreX++;
    } else {
        game.score.scoreO++;
    };
    document.getElementById(`btn${gameId}`).disabled = false;
    
   
    document.getElementById(`playerX${gameId}`).innerHTML = game.score.scoreX;
    document.getElementById(`playerO${gameId}`).innerHTML = game.score.scoreO;

}

function getGames() { //din bd
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
    document.getElementById(`status${idx}`).innerHTML = game.nextMove;
    game.nextMove = game.nextMove === 'X' ? 'O' : 'X';
    let symbol = game.nextMove;

    cell.innerHTML = symbol;
    cell.style.backgroundColor = setColor(symbol);
    game[cell.id.split('_')[0]] = symbol;
    playerWin(game);
   
}

function setColor(symbol) {
    return symbol == "X" ? conf.xcolor : conf.ocolor;
}


function gameOver(){
 
 
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
