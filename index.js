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
        c4: null,
        c5: null,
        c6: null,
        c7: null,
        c8: null,
        c9: null
    }
];

var audio = new Audio('sound.wav'); 

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
    if(~wins.indexOf(game.c2+game.c5+game.c8))
        return alert('Gata joc');
    if(~wins.indexOf(game.c3+game.c6+game.c9))
        return alert('Gata joc');
    if(~wins.indexOf(game.c1+game.c5+game.c9))
        return alert('Gata joc');
    if(~wins.indexOf(game.c3+game.c5+game.c7))
        return alert('Gata joc');
    audio.play();
}


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
    let players = document.getElementById("players");
    
    let opUser = (game.idUser1 === loggedUser ? game.idUser2 : game.idUser1);
    let email = users.filter(u => u.id === opUser)[0].email;
    players.innerHTML = `<p> Player 2: ${email}</p>`;
    el.innerHTML="";
    el.innerHTML += `<div id="c1" class="game-cell" onclick="Logic(this)">${game.c1 || ''}</div>`;
    el.innerHTML += `<div id="c2" class="game-cell" onclick="Logic(this)">${game.c2 || ''}</div>`;
    el.innerHTML += `<div id="c3" class="game-cell" onclick="Logic(this)">${game.c3 || ''}</div>`;
    el.innerHTML += `<div id="c4" class="game-cell" onclick="Logic(this)">${game.c4 || ''}</div>`;
    el.innerHTML += `<div id="c5" class="game-cell" onclick="Logic(this)">${game.c5 || ''}</div>`;
    el.innerHTML += `<div id="c6" class="game-cell" onclick="Logic(this)">${game.c6 || ''}</div>`;
    el.innerHTML += `<div id="c7" class="game-cell" onclick="Logic(this)">${game.c7 || ''}</div>`;
    el.innerHTML += `<div id="c8" class="game-cell" onclick="Logic(this)">${game.c8 || ''}</div>`;
    el.innerHTML += `<div id="c9" class="game-cell" onclick="Logic(this)">${game.c9 || ''}</div>`;
}

let currentPlayer = 1;

function Logic(cell){
       //alert(a);
        console.log(cell);
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
    
}

function resetGame(){
    currentPlayer=1;
    for(let i=0;i<=8;i++)
        document.getElementsByClassName('game-cell')[i].innerHTML="";
    games[0].c1=null;
    games[0].c2=null;
    games[0].c3=null;
    games[0].c4=null;
    games[0].c5=null;
    games[0].c6=null;
    games[0].c7=null;
    games[0].c8=null;
    games[0].c9=null;

}
function getGames() {
    fetch('api/query.php?query=games-by-user&id=1')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(console.error);
}

<<<<<<< HEAD








=======
document.onreadystatechange = () => showData();
>>>>>>> master
