let loggedUser = 1; // utilizatorul conectat in aplicatie
let users = [ // lista completa de jucatori
    { id: 1, email: 'viorelfilip@outlook.com' },
    { id: 2, email: 'emeric.lacatus@gmail.com' }
];


let games = [ // doar jocurile utilizatorului conectat
    {
        id: 1,
        idUser1: 1,
        idUser2: 2,
        c1: null,
        c2: null,
        c3: null,
        c4: 'X',
        c5: 'O',
        c6: null,
        c7: 'X',
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
    el.innerHTML = 'Player 1: ' + users.filter(u => u.id === loggedUser)[0].email;

 
}

function showGames() {
    let game = games[0];
    let el = document.getElementById('game');
    let players = document.getElementsByClassName("players")[0];


    let opUser = (game.idUser1 === loggedUser ? game.idUser2 : game.idUser1);
    let email = users.filter(u => u.id === opUser)[0].email;
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

let currPlayer = 1;

function clickCell(cell){
    //let cell = document.getElementById('game');
    console.log(cell.id);
    if(cell.innerHTML === 'X' || cell.innerHTML === 'O'){
       return;
    }
    let symbol = "";
    if(currPlayer == 1){
        symbol = "X";
        currPlayer = 2;
    } else {
        symbol = "O";
        currPlayer = 1;
    }
    
    cell.innerHTML = symbol;
    console.log("Cell was clicked!");

}





