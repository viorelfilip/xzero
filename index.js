let loggedUser = 1; // utilizatorul conectat in aplicatie
let gamewin = new Audio("win-sound.mp3");
let click = new Audio("click-sound.mp3");

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

let games2 = [ // doar jocurile utilizatorului conectat
    {
        id: 1,
        idUser1_2: 1,
        idUser2_2: 2,
        c1_2: null,
        c2_2: null,
        c3_2: null,
        c4_2: 'x',
        c5_2: '0',
        c6_2: null,
        c7_2: 'x',
        c8_2: null,
        c9_2: null
    }
];

function showData() {
    showGames();
    showLoggedUser();
}

function gameOver(){
    let game = games[0];
    let wins = ['OOO', 'XXX']
    if(~wins.indexOf(game.c1+game.c2+game.c3)){
        gamewin.play();
        return alert('Gata joc');
    }
    if(~wins.indexOf(game.c4+game.c5+game.c6)){
        gamewin.play();
        return alert('Gata joc');
    }
    if(~wins.indexOf(game.c7+game.c8+game.c9)){
        gamewin.play();
        return alert('Gata joc');
    }
    if(~wins.indexOf(game.c1+game.c4+game.c7)){
        gamewin.play();
        return alert('Gata joc');
    }
    if(~wins.indexOf(game.c1+game.c5+game.c9)){
        gamewin.play();
        return alert('Gata joc');   
    }
    if(~wins.indexOf(game.c2+game.c5+game.c8)){
        gamewin.play();
        return alert('Gata joc');   
    }
    if(~wins.indexOf(game.c3+game.c6+game.c9)){
        gamewin.play();
        return alert('Gata joc');   
    }
    if(~wins.indexOf(game.c3+game.c5+game.c7)){
        gamewin.play();
        return alert('Gata joc');   
    }
    click.play();
    
}

function gameOver2(){
    let game2 = games2[0];
    let wins = ['OOO', 'XXX']
    if(~wins.indexOf(game2.c1_2+game2.c2_2+game2.c3_2)){
        gamewin.play();
        return alert('Gata joc');
    }
    if(~wins.indexOf(game2.c4_2+game2.c5_2+game2.c6_2)){
        gamewin.play();
        return alert('Gata joc');
    }
    if(~wins.indexOf(game2.c7_2+game2.c8_2+game2.c9_2)){
        gamewin.play();
        return alert('Gata joc');
    }
    if(~wins.indexOf(game2.c1_2+game2.c4_2+game2.c7_2)){
        gamewin.play();
        return alert('Gata joc');
    }
    if(~wins.indexOf(game2.c1_2+game2.c5_2+game2.c9_2)){
        gamewin.play();
        return alert('Gata joc');   
    }
    if(~wins.indexOf(game2.c2_2+game2.c5_2+game2.c8_2)){
        gamewin.play();
        return alert('Gata joc');   
    }
    if(~wins.indexOf(game2.c3_2+game2.c6_2+game2.c9_2)){
        gamewin.play();
        return alert('Gata joc');   
    }
    if(~wins.indexOf(game2.c3_2+game2.c5_2+game2.c7_2)){
        gamewin.play();
        return alert('Gata joc');   
    }
    click.play();
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
    el.innerHTML = `<p>Player 2: ${email}</p>`;

    
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
    if (symbol == "X") {
        cell.style.backgroundColor = "red";
    } else {
        symbol == "O";
        cell.style.backgroundColor = "yellow";
    }

    
    cell.innerHTML = symbol;
    games[0][cell.id] = symbol;
    gameOver();
    console.log("Cell was clicked!");

}
let currentPlayer2 = 3;
function clickOnCell2(cell2){
    //let cell = document.getElementById('game');
    console.log(cell2.id);
    if(cell2.innerHTML === 'X' || cell2.innerHTML === 'O'){
    return;
    }
    let symbol2 = "";
    if(currentPlayer2 == 3){
        symbol2 = "X";
        currentPlayer2 = 4;
    } else {
        symbol2 = "O";
        currentPlayer2 = 3;
    }
    if (symbol2 == "X") {
        cell2.style.backgroundColor = "red";
    } else {
        symbol2 == "O";
        cell2.style.backgroundColor = "yellow";
    }

    
    cell2.innerHTML = symbol2;
    games2[0][cell2.id] = symbol2;
    gameOver2();
    console.log("Cell was clicked!");

}

function restartGame(){
    currentPlayer=1;
    for(let i=0;i<=8;i++){
        document.getElementsByClassName('game-cell')[i].innerHTML="";
        document.getElementsByClassName('game-cell')[i].style.backgroundColor = '#088bcc';
    }
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


function restartGame2(){
    currentPlayer=3;
    for(let i=0;i<=8;i++){
        document.getElementsByClassName('game-cell2')[i].innerHTML="";
        document.getElementsByClassName('game-cell2')[i].style.backgroundColor = '#088bcc';
    }
    games2[0].c1_2=null;
    games2[0].c2_2=null;
    games2[0].c3_2=null;
    games2[0].c4_2=null;
    games2[0].c5_2=null;
    games2[0].c6_2=null;
    games2[0].c7_2=null;
    games2[0].c8_2=null;
    games2[0].c9_2=null;

    
}


function getGames() {
    fetch('api/query.php?query=games-by-user&id=1')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(console.error);
}



document.onreadystatechange = () => showData();
