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

let games1 = [ // doar jocurile utilizatorului conectat
  {
      id: 1,
      cl1: null,
      cl2: null,
      cl3: null,
      cl4: null,
      cl5: null,
      cl6: null,
      cl7: null,
      cl8: null,
      cl9: null
  }
];



function gameOver(){
  let game = games[0];
  //let wins = ['OOO', 'XXX']
 

  if(game.c1+game.c2+game.c3 ==='XXX'){
    return alert('Primul joc s-a terminat! A castigat X!');
  }else if(game.c1+game.c2+game.c3 === 'OOO'){
    return alert('Primul joc s-a terminat! A castigat O!');
  }
  
  
  if(game.c4+game.c5+game.c6 ==='XXX'){
      return alert('Primul joc s-a terminat! A castigat X!');
    }else if(game.c4+game.c5+game.c6 ==='OOO'){
    return alert('Primul joc s-a terminat! A castigat O!');}
  

  if(game.c7+game.c8+game.c9 === 'XXX'){
      return alert('Primul joc s-a terminat! A castigat X!');
  }else if(game.c7+game.c8+game.c9 === 'OOO'){
    return alert('Primul joc s-a terminat! A castigat O!'); }

  if(game.c1+game.c4+game.c7 === 'XXX'){
      return alert('Primul joc s-a terminat! A castigat X!');
  }else if(game.c1+game.c4+game.c7 === 'OOO'){
  return alert('Primul joc s-a terminat! A castigat O!');}

  if(game.c2+game.c5+game.c8 === 'XXX'){
      return alert('Primul joc s-a terminat! A castigat X!');
  }else if(game.c2+game.c5+game.c8 === 'OOO'){
    return alert('Primul joc s-a terminat! A castigat O!');
  }


  if(game.c3+game.c6+game.c9 === 'XXX'){
      return alert('Primul joc s-a terminat! A castigat X!');
  }else if(game.c3+game.c6+game.c9 === 'OOO'){
    return alert('Primul joc s-a terminat! A castigat O!');
  }

  if(game.c1+game.c5+game.c9 === 'XXX'){
      return alert('Primul joc s-a terminat! A castigat X!');
  }else if(game.c1+game.c5+game.c9 === 'OOO'){
    return alert('Primul joc s-a terminat! A castigat O!');
  }


  if(game.c3+game.c5+game.c7 === 'XXX'){
      return alert('Primul joc s-a terminat! A castigat X!');
  }else if(game.c3+game.c5+game.c7 === 'OOO'){
    return alert('Primul joc s-a terminat! A castigat O!');
  }

     
}


function gameOver1(){
  let game1 = games1[0];
  //let wins = ['OOO', 'XXX']
 

  if(game1.cl1+game1.cl2+game1.cl3 ==='XXX'){
    return alert('Al doilea joc s-a terminat! A castigat X!');
  }else if(game1.cl1+game1.cl2+game1.cl3 === 'OOO'){
    return alert('Al doilea joc s-a terminat! A castigat O!');
  }
  
  
  if(game1.cl4+game1.cl5+game1.cl6 ==='XXX'){
      return alert('Al doilea joc s-a terminat! A castigat X!');
    }else if(game1.cl4+game1.cl5+game1.cl6 ==='OOO'){
    return alert('Al doilea joc s-a terminat! A castigat O!');}
  

  if(game1.cl7+game1.cl8+game1.cl9 === 'XXX'){
      return alert('Al doilea joc s-a terminat! A castigat X!');
  }else if(game1.cl7+game1.cl8+game1.cl9 === 'OOO'){
    return alert('Al doilea joc s-a terminat! A castigat O!'); }

  if(game1.cl1+game1.cl4+game1.cl7 === 'XXX'){
      return alert('Al doilea joc s-a terminat! A castigat X!');
  }else if(game1.cl1+game1.cl4+game1.cl7 === 'OOO'){
  return alert('Al doilea joc s-a terminat! A castigat O!');}

  if(game1.cl2+game1.cl5+game1.cl8 === 'XXX'){
      return alert('Al doilea joc s-a terminat! A castigat X!');
  }else if(game1.cl2+game1.cl5+game1.cl8 === 'OOO'){
    return alert('Al doilea joc s-a terminat! A castigat O!');
  }


  if(game1.cl3+game1.cl6+game1.cl9 === 'XXX'){
      return alert('Al doilea joc s-a terminat! A castigat X!');
  }else if(game1.cl3+game1.cl6+game1.cl9 === 'OOO'){
    return alert('Al doilea joc s-a terminat! A castigat O!');
  }

  if(game1.cl1+game1.cl5+game1.cl9 === 'XXX'){
      return alert('Al doilea joc s-a terminat! A castigat X!');
  }else if(game1.cl1+game1.cl5+game1.cl9 === 'OOO'){
    return alert('Al doilea joc s-a terminat! A castigat O!');
  }


  if(game1.cl3+game1.cl5+game1.cl7 === 'XXX'){
      return alert('Al doilea joc s-a terminat! A castigat X!');
  }else if(game1.cl3+game1.cl5+game1.cl7 === 'OOO'){
    return alert('Al doilea joc s-a terminat! A castigat O!');
  }

  
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

    let game1 = games1[0];
    let el1 = document.getElementById('game1');

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

    el1.innerHTML += `<div id="cl1" onClick="clickCell1(this)" class="game-cell">${game1.cl1 || ''}</div>`;
    el1.innerHTML += `<div id="cl2" onClick="clickCell1(this)" class="game-cell">${game1.cl2 || ''}</div>`;
    el1.innerHTML += `<div id="cl3" onClick="clickCell1(this)" class="game-cell">${game1.cl3 || ''}</div>`;
    el1.innerHTML += `<div id="cl4" onClick="clickCell1(this)" class="game-cell">${game1.cl4 || ''}</div>`;
    el1.innerHTML += `<div id="cl5" onClick="clickCell1(this)" class="game-cell">${game1.cl5 || ''}</div>`;
    el1.innerHTML += `<div id="cl6" onClick="clickCell1(this)" class="game-cell">${game1.cl6 || ''}</div>`;
    el1.innerHTML += `<div id="cl7" onClick="clickCell1(this)" class="game-cell">${game1.cl7 || ''}</div>`;
    el1.innerHTML += `<div id="cl8" onClick="clickCell1(this)" class="game-cell">${game1.cl8 || ''}</div>`;
    el1.innerHTML += `<div id="cl9" onClick="clickCell1(this)" class="game-cell">${game1.cl9 || ''}</div>`;

  
}
  


let currPlayer = 1;

function clickCell(cell){
  console.log(cell.id);
  if(cell.innerHTML === 'X' || cell.innerHTML === 'O'){
    return;
  }
  let symbol = "";
  if(currPlayer == 1){
    symbol = "X"
    currPlayer = 2;
  } else{
    symbol = "O";
    currPlayer = 1;
  }
  cell.innerHTML = symbol;
  games[0][cell.id] = symbol;
    gameOver();
    
}


let currPlayer1 = 1;

function clickCell1(cell){
  console.log(cell.id);
  if(cell.innerHTML === 'X' || cell.innerHTML === 'O'){
    return;
  }
  let symbol = "";
  if(currPlayer1 == 1){
    symbol = "X"
    currPlayer1 = 2;
  } else{
    symbol = "O";
    currPlayer1 = 1;
  }
  cell.innerHTML = symbol;
  games1[0][cell.id] = symbol;
  gameOver1();
    
}

