var app = angular.module("app", []);

app.value("userName", localStorage.getItem("userName"));

app.controller("xzero", xzero);
function xzero($http, game, userName) {
    var vm = this;
    vm.userName = userName;
    vm.games = [];
    vm.update = function () {
        if (!userName) return;
        $http({
            method: 'GET',
            url: '/update?player=' + userName
        }).then(function successCallback(response) {
            //alert(JSON.stringify(response));
            vm.players = response.data.players;
            response.data.games.forEach(function (item) {
                if (item.stare === 'init')
                    if (confirm(item.player1 + ' vrea sa joace cu tine. De acord ?'))
                        vm.games.push(game.create(item));
                if (item.move) {
                    // pentru care joc ?
                    // gasim jocul si ii dam mutarea ()
                    vm.games.forEach(function (game) {
                        if (game.player1.name === item.player1 && game.player2.name === item.player2)
                            game.oponentMove(item);
                    });
                }
            });
        });
    }
    vm.newGame = function newGame(player) {
        // if (confirm('Play with ' + player.name + ' ?'))
        var newGame = game.create(player.name);
        vm.games.push(newGame);
        // temporar
        // newGame.autoPlay();
    }
    vm.register = function () {
        vm.newUser = vm.newUser || userName;
        $http({
            method: 'GET',
            url: '/register?player=' + vm.newUser
        }).then(function successCallback(response) {
            localStorage.setItem("userName", vm.newUser);
            app.value("userName", vm.newUser);
            vm.userName = vm.newUser;
            vm.players = response.data;
        }, function errorCallback(response) {
            alert('Eroare la comunicarea cu serverul !\n' + response);
        });
    }
    setInterval(vm.update, 2000);
    if (userName) vm.register();
}