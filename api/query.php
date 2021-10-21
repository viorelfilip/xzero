<?php
include_once 'mysql.php';

$queries = array( // declare here all the queries
    'users-all'      => 'select * from users',
    'games-all'      => 'select * from games',
    'games-by-user'  => 'select * from games where ? in (idUser1, idUser2)',
    'new-game'       => 'insert into games(idUser1, idUser2) values(?, ?)',
    'new-user'       => 'insert into users(email,password) values(?, ?)',
    'set-game-by-id' => 'update games set c1=?,c2=?,c3=?,c4=?,c5=?,c6=?,c7=?,c8=?,c9=? where id=?',
    'set-game-c1'    => 'update games set c1=? where id=?',
    'set-game-c2'    => 'update games set c2=? where id=?',
    'set-game-c3'    => 'update games set c3=? where id=?',
    'set-game-c4'    => 'update games set c4=? where id=?',
    'set-game-c5'    => 'update games set c5=? where id=?',
    'set-game-c6'    => 'update games set c6=? where id=?',
    'set-game-c7'    => 'update games set c7=? where id=?',
    'set-game-c8'    => 'update games set c8=? where id=?',
    'set-game-c9'    => 'update games set c9=? where id=?'
);

if (!empty($argv)) { // for debug scenario, command line get params
    parse_str(implode('&', array_slice($argv, 1)), $_GET);
}

if (!(array_key_exists("query", $_GET))) {
    header('HTTP/1.1 400 Bad Request {"query": "param <query> is required"}');
    exit;
}

while ($query = current($queries)) {
    if (key($queries) == $_GET["query"]) {
        if (strpos($query, '?') !== false) {
            array_shift($_GET);
            mysql::query($query, $_GET);
        } else {
            mysql::query($query);
        }
        exit();
    }
    next($queries);
}

// $query = $_GET["query"];
// mysql::query($query);
