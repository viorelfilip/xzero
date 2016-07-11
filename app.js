var app = angular.module("app", []);

app.value("userName", localStorage.getItem("userName"));

app.controller("xzero", xzero);
function xzero($http, game, userName) {
    var vm = this;
    vm.userName = userName;
    vm.games = [];
    vm.status = function () {
        $http({
            method: 'GET',
            url: '/status?player=' + userName
        }).then(function successCallback(response) {
            vm.players = response.data;
        });
    }
    vm.newGame = function newGame(player) {
        // if (confirm('Play with ' + player.name + ' ?'))
        var newGame = game.create(player.name);
        vm.games.push(newGame);
        // temporar
        newGame.autoPlay();
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
    setInterval(vm.status, 2000);
    if (userName) vm.register();
}