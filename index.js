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

function gameOver(){
let game=games[0];//verificare pt primul din array
//let wins=['OOO','XXX']

/*if((game.c1+game.c2+game.c3 == 'XOX' ) && (game.c4+game.c5+game.c6 == 'XXO' ) && (game.c7+game.c8+game.c9 == 'OXO' ))
return alert('Remiza');*/
if(game.c1+game.c2+game.c3 == 'XXX'){
return alert('X castiga!');
}else if(game.c1+game.c2+game.c3 == 'OOO'){
    return alert('O castiga!');
}

if(game.c4+game.c5+game.c6 == 'XXX'){
    return alert('X castiga!');
    }else if(game.c4+game.c5+game.c6 == 'OOO'){
        return alert('O castiga!');
    }

    if(game.c7+game.c8+game.c9 == 'XXX'){
        return alert('X castiga!');
        }else if(game.c7+game.c8+game.c9 == 'OOO'){
            return alert('O castiga!');
        }

        if(game.c1+game.c4+game.c7 == 'XXX'){
            return alert('X castiga!');
            }else if(game.c1+game.c4+game.c7 == 'OOO'){
                return alert('O castiga!');
            }

            if(game.c2+game.c5+game.c8 == 'XXX'){
                return alert('X castiga!');
                }else if(game.c2+game.c5+game.c8 == 'OOO'){
                    return alert('O castiga!');
                }
                if(game.c3+game.c6+game.c9 == 'XXX'){
                    return alert('X castiga!');
                    }else if(game.c3+game.c6+game.c9 == 'OOO'){
                        return alert('O castiga!');
                    }

                    if(game.c3+game.c5+game.c7 == 'XXX'){
                        return alert('X castiga!');
                        }else if(game.c3+game.c5+game.c7 == 'OOO'){
                            return alert('O castiga!');
                        }
                        if(game.c1+game.c5+game.c9 == 'XXX'){
                            return alert('X castiga!');
                            }else if(game.c1+game.c5+game.c9 == 'OOO'){
                                return alert('O castiga!');
                            }



/*else if((game.c1+game.c2+game.c3 != 'XXX' || 'OOO') && (game.c4+game.c5+game.c6 !='XXX' || 'OOO' ) && (game.c7+game.c8+game.c9 != 'XXX' || 'OOO') && (game.c1+game.c4+game.c7 !='XXX' || 'OOO') && (game.c2+game.c5+game.c8 != 'XXX' || 'OOO')  && (game.c3+game.c6+game.c9 != 'XXX' || 'OOO' ) && (game.c1+game.c5+game.c9 != 'XXX' || 'OOO') && (game.c3+game.c5+game.c7 != 'XXX' || 'OOO') ){
    return alert('Remiza');   
}*/
}  

function Resetare(){
    
}

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
    let players = document.getElementsByClassName("players")[0];

    let opUser = (game.idUser1 === loggedUser ? game.idUser2 : game.idUser1);
    let email = users.filter(u => u.id === opUser)[0].email;
    players.innerHTML = `<p> Player 2: ${email}</p>`;

    el.innerHTML += `<div id="c1" onClick="clickCell(this)" class="game-cell">${game.c1 || ''}</div>`
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
   // console.log(cell.id);
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

   // console.log("Cell was clicked!");
   games[0][cell.id] = symbol;
   gameOver();
}
/*
 function castiga(){

    if((c1==c2) && (c2==c3) && (c3 !='')){
        return c3;
    }
   if((c4==c5) && (c5==c6) && (c6 !='')){
       return c6;
   }
   if((c7==c8) && (c8==c9) && (c9 !='')){
       return c9;
   }
 }

*/











