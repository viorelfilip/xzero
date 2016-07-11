angular
    .module("app")
    .service("game", game);

function game($http, userName) {
    var service = this;
    service.create = function (playerName) {
        if (playerName.player1)
            var player = { name: userName, value: '0' };
        else {
            var player = { name: playerName, value: 'X' }; // cel care va incepe jocul, este cel invitat ( oponetul / adversarul )
            $http({
                method: 'GET',
                url: '/createNewGame?player=' + userName + '&oponent=' + playerName
            }).then(function successCallback(response) {
                vm.players = response.data;
            });
        }
        return {
            oponentPlayer: playerName.player1 || player.name,
            gameOver: false,
            player1: { name: playerName.player1 || userName, value: (playerName.player1 ? 'X' : '0') },
            player2: player,
            player: player,
            rows: [
                [{ value: '', color: 'default' }, { value: '', color: 'default' }, { value: '', color: 'default' }],
                [{ value: '', color: 'default' }, { value: '', color: 'default' }, { value: '', color: 'default' }],
                [{ value: '', color: 'default' }, { value: '', color: 'default' }, { value: '', color: 'default' }],
            ],
            autoPlay: function () {
                var vm = this;
                var start = true;
                setInterval(function () {
                    if (vm.gameOver || vm.player.name === userName) return;
                    if (start) start = (vm.clickHandle(vm.rows[1], 1) && false);
                    else {
                        for (var row = vm.rows.length; row--;) {
                            for (var col = vm.rows[row].length; col--;) {
                                if (!vm.rows[row][col].value) return vm.clickHandle(vm.rows[row], col);
                            }
                        }
                    }
                }, 2000); // oponentul (calculatorul) are max 2 sec de gandire :) 
            },
            isDisabled: function () { return this.gameOver || (this.player.name === this.oponentPlayer) },
            clickHandle: function (row, index) {
                if (row[index].value || this.gameOver) return;
                row[index].value = this.player.value;
                this.updateStatus();
            },
            updateStatus: function () {
                // verifica daca e gata jocul
                // 1. exista o combinatie castigatoare
                // sau
                // 2. toate casutele sunt ocupate
                var value = this.player.value;
                var vm = this;
                // randurile
                var row = vm.rows[0];
                if (row[0].value === value && row[1].value === value && row[2].value === value)
                    return vm.incheie('r1');
                var row = vm.rows[1];
                if (row[0].value === value && row[1].value === value && row[2].value === value)
                    return vm.incheie('r2');
                var row = vm.rows[2];
                if (row[0].value === value && row[1].value === value && row[2].value === value)
                    return vm.incheie('r3');
                // coloanele    
                if (vm.rows[0][0].value && (vm.rows[0][0].value == vm.rows[1][0].value && vm.rows[0][0].value == vm.rows[2][0].value))
                    return vm.incheie('c1');
                if (vm.rows[0][1].value && (vm.rows[0][1].value == vm.rows[1][1].value && vm.rows[0][1].value == vm.rows[2][1].value))
                    return vm.incheie('c2');
                if (vm.rows[0][2].value && (vm.rows[0][2].value == vm.rows[1][2].value && vm.rows[0][2].value == vm.rows[2][2].value))
                    return vm.incheie('c3');
                // diagonalele
                if (vm.rows[0][0].value && (vm.rows[0][0].value == vm.rows[1][1].value && vm.rows[0][0].value == vm.rows[2][2].value))
                    return vm.incheie('d1');
                if (vm.rows[0][2].value && (vm.rows[0][2].value == vm.rows[1][1].value && vm.rows[0][2].value == vm.rows[2][0].value))
                    return vm.incheie('d2');

                var egal = true;
                vm.rows.forEach(function (row) {
                    row.forEach(function (col) {
                        if (!col.value)
                            egal = false;
                    });
                });
                if (egal)
                    return vm.incheie('=');
                vm.player = (vm.player === vm.player1) ? vm.player2 : vm.player1;
            },
            reset: function () {
                var vm = this;
                vm.rows.forEach(function (row) {
                    row.forEach(function (col) {
                        col.value = '';
                        col.color = 'default';
                    });
                });
                vm.gameOver = false;
                vm.player = player;
            },
            incheie: function (param) {
                var vm = this;
                vm.gameOver = true;
                switch (param.substr(0, 1)) {
                    case 'r':
                        var row = vm.rows[param.substr(1, 1) - 1];
                        row[0].color = row[1].color = row[2].color = 'success';
                        break;
                    case 'c':
                        var col = param.substr(1, 1) - 1;
                        vm.rows[0][col].color = vm.rows[1][col].color = vm.rows[2][col].color = 'success';
                        break;
                    case 'd':
                        if (param == 'd1') {
                            vm.rows[0][0].color = vm.rows[1][1].color = vm.rows[2][2].color = 'success';
                        }
                        if (param == 'd2') {
                            vm.rows[0][2].color = vm.rows[1][1].color = vm.rows[2][0].color = 'success';
                        }
                        break;
                    default: // '='
                        vm.rows.forEach(function (row) {
                            row.forEach(function (col) {
                                col.color = 'warning'; // remiza
                            }, this);
                        }, this);
                        break;
                }
            }
        };
    }
}