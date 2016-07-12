module.exports = {
    register: register,
    update: update,
    move: move,
    createNewGame: createNewGame
};

var players = [];
var games = [];
var gameApi = {
    player1: 'Viorel',
    player2: 'Andra',
    player: 'Viorel',
    stare: '2,2'
};

setInterval(function () {
    for (var index = players.length; index--;) {
        var date = new Date();
        if (date.getTime() - players[index].date.getTime() > 5000) { // au trecut mai mult de 5 sec de la ultimul ping
            console.warn(players[index].name + ' removed from list ...');
            players.splice(players[index], 1);
        }
    }
}, 5000);

function* move() {
    //console.log('New move was made : ');
    //console.log(this.request.body);    
    // var move = {
    //     player1: 'Viorel',
    //     player2: 'Andra',
    //     player: 'Viorel',
    //     stare: '2,2'
    // }
    //console.log('move is instanceof : ' + (this.request.body instanceof 'String' ? 'String' : 'Object'));
    games.push(JSON.parse(this.request.body));
    console.log('player = ' + this.request.body.player);
}

function* register() {
    var player = this.query.player;
    if (player) {
        var foundPlayer = undefined;
        players.forEach((item) => {
            if (item.name === player) foundPlayer = item;
        });
        if (foundPlayer) foundPlayer.date = new Date();
        else {
            console.info(player + ' added to list ...');
            players.push({ name: player, date: new Date() });
        }
        this.body = players;
    } else {
        this.body = [{ name: "Alege un name de jucator !", date: new Date() }];
    }
}
function* createNewGame() {
    // adauga in lista de jocuri
    // inca o partida, notifica oponentul ca are un jos in asteptare
    // atunci cand cere noul status
    console.log('Jucatorul ' + this.query.player + ' a initiat o partida cu ' + this.query.oponent);
    games.push({
        player1: this.query.player,
        player2: this.query.oponent,
        player: this.query.player,
        stare: 'init'
    });
}
function* update() {
    var userGames = [];
    games.forEach((game) => {
        if ((game.player1 === this.query.player || game.player2 === this.query.player) && game.player !== this.query.player)
            userGames.push(game);
    });
    if (userGames.length)
        console.log(this.query.player + ' are jocurile : \n' + JSON.stringify(userGames));
    userGames.forEach((game) => {
        games.splice(games.indexOf(game), 1);
    });

    this.body = {
        players: players,
        games: userGames
    };

    var player = this.query.player;
    players.forEach((item) => {
        if (item.name === player)
            item.date = new Date();
    });
}

