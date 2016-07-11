module.exports = {
    register: register,
    status: status
};

var players = [];

setInterval(function () {
    for (var index = players.length; index--;) {
        var date = new Date();
        if (date.getTime() - players[index].date.getTime() > 5000) { // au trecut mai mult de 5 sec de la ultimul ping
            console.warn(players[index].name + ' removed from list ...');
            players.splice(players[index], 1);
        }
    }
}, 5000);

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

function* status() {
    this.body = players;
    var player = this.query.player;
    players.forEach((item) => {
        if (item.name === player)
            item.date = new Date();
    });
}

