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
        c4: 'x',
        c5: '0',
        c6: null,
        c7: 'x',
        c8: null,
        c9: null
    }
];

function showData() {
    showGames();
    showLoggedUser();
}

function gameOver(){
    let game = games[0];
    let wins = ['OOO', 'XXX']
    if(~wins.indexOf(game.c1+game.c2+game.c3))
        return alert('Gata joc');
    if(~wins.indexOf(game.c4+game.c5+game.c6))
        return alert('Gata joc');
    if(~wins.indexOf(game.c7+game.c8+game.c9))
        return alert('Gata joc');
    if(~wins.indexOf(game.c1+game.c4+game.c7))
        return alert('Gata joc');
    if(~wins.indexOf(game.c1+game.c5+game.c9))
        return alert('Gata joc');   
    if(~wins.indexOf(game.c2+game.c5+game.c8))
        return alert('Gata joc');   
    if(~wins.indexOf(game.c3+game.c6+game.c9))
        return alert('Gata joc');   
    if(~wins.indexOf(game.c3+game.c5+game.c7))
        return alert('Gata joc');   
}

function showLoggedUser() {
    let el = document.getElementsByClassName("loggedUser")[0];
    el.innerHTML = 'Salut, ' + users.filter(u => u.id === loggedUser)[0].email;
}
function showGames() {
    let game = games[0];
    let el = document.getElementById('game');
    let players = document.getElementsByClassName("players")[0];
    let opUser = (game.idUser1 === loggedUser ? game.idUser2 : game.idUser1);
    let email = users.filter(u => u.id === opUser)[0].email;
    el.innerHTML = `<p>${email}</p>`;

    
}
let currentPlayer = 1;
function clickOnCell(cell){
    //let cell = document.getElementById('game');
    console.log(cell.id);
    if(cell.innerHTML === 'X' || cell.innerHTML === 'O'){
    return;
    }
    let symbol = "";
    if(currentPlayer == 1){
        symbol = "X";
        currentPlayer = 2;
    } else {
        symbol = "O";
        currentPlayer = 1;
    }
    
    cell.innerHTML = symbol;
    games[0][cell.id] = symbol;
    gameOver();
    console.log("Cell was clicked!");

}




