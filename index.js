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

function showLoggedUser() {
    let el = document.getElementsByClassName("loggedUser")[0];
    el.innerHTML = 'Salut, ' + users.filter(u => u.id === loggedUser)[0].email;
}
function showGames() {
    let game = games[0];
    let el = document.getElementById('game');
    let opUser = (game.idUser1 === loggedUser ? game.idUser2 : game.idUser1);
    let email = users.filter(u => u.id === opUser)[0].email;
    el.innerHTML = `<p>${email}</p>`;
    // el.innerHTML += `<div class="game-cell">${game.c1 || ''}</div>`;
    // el.innerHTML += `<div class="game-cell">${game.c2 || ''}</div>`;
    // el.innerHTML += `<div class="game-cell">${game.c3 || ''}</div>`;
    // el.innerHTML += `<div class="game-cell">${game.c4 || ''}</div>`;
    // el.innerHTML += `<div class="game-cell">${game.c5 || ''}</div>`;
    // el.innerHTML += `<div class="game-cell">${game.c6 || ''}</div>`;
    // el.innerHTML += `<div class="game-cell">${game.c7 || ''}</div>`;
    // el.innerHTML += `<div class="game-cell">${game.c8 || ''}</div>`;
    // el.innerHTML += `<div class="game-cell">${game.c9 || ''}</div>`;
    
}
const changeTurn = () => {
    return turn === "X" ? "0" : "X"
}

const checkWin = () => {

}
let turn = "X";
let boxes = document.getElementsByClassName("game-cell");
Array.from(boxes).forEach(element =>{
    let textcell = element.querySelector('.celltext');
    element.addEventListener('click', (e) =>{
        if(textcell.innerText === ''){
            textcell.innerText = turn;
            changeTurn();
            checkWin();

        }
    })
})