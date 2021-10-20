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
    clickOnCell();
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
    console.log("Cell was clicked!");

}

const winningConditions = [
        [c1, c2, c3],
        [c4, c5, c6],
        [c7, c8, c9],
        [c1, c4, c7],
        [c2, c5, c8],
        [c3, c6, c9],
        [c1, c5, c9],
        [c3, c5, c7]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
        continue;
    }
    if (a === b && b === c) {
        roundWon = true;
        break
    }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
}

