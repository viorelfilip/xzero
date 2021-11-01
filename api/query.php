
<?php
include_once 'mysql.php';

$queries = array( // declare here all the queries
    'users-all'      => 'select * from users',
    'games-all'      => 'select * from games',
    'games-by-user'  => 'select * from games where ? in (idUser1, idUser2)',
    'new-game'       => 'insert into games(idUser1, idUser2) values(?, ?)',
    'new-user'       => 'insert into users(email,password) values(?, ?)',
    'reset-game' => "update games set c1=null,c2=null,c3=null,c4=null,c5=null,c6=null,c7=null,c8=null,c9=null,nextMove='X',userX=IF(userX=idUser1, idUser2, idUser1), active=IF(userX=idUser1 && nextmove='O',1,0) where id=?",
    'set-game-scor'    => "update games set scorUser1=?, scorUser2=?, active=0 where id=?",
    'set-game-c1'    => "update games set c1=?, nextMove=IF(nextMove='X', 'O', 'X') where id=?",
    'set-game-c2'    => "update games set c2=?, nextMove=IF(nextMove='X', 'O', 'X') where id=?",
    'set-game-c3'    => "update games set c3=?, nextMove=IF(nextMove='X', 'O', 'X') where id=?",
    'set-game-c4'    => "update games set c4=?, nextMove=IF(nextMove='X', 'O', 'X') where id=?",
    'set-game-c5'    => "update games set c5=?, nextMove=IF(nextMove='X', 'O', 'X') where id=?",
    'set-game-c6'    => "update games set c6=?, nextMove=IF(nextMove='X', 'O', 'X') where id=?",
    'set-game-c7'    => "update games set c7=?, nextMove=IF(nextMove='X', 'O', 'X') where id=?",
    'set-game-c8'    => "update games set c8=?, nextMove=IF(nextMove='X', 'O', 'X') where id=?",
    'set-game-c9'    => "update games set c9=?, nextMove=IF(nextMove='X', 'O', 'X') where id=?", 
    'set-active-game' => "update games set active = 0 where id = ?",
    'set-game-scor'  => "update games set scorUser1=?, scorUser2=? where id=?"
);

if (!empty($argv)) { // for debug scenario, command line get params
    parse_str(implode('&', array_slice($argv, 1)), $_GET);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (!(array_key_exists("query", $_GET))) {
        header('HTTP/1.1 400 Bad Request {"query": "param <query> is required"}');
        exit;
    }
    $queryKey = $_GET["query"];
} else {
    $_POST = json_decode(file_get_contents('php://input'), true);
    if (!(array_key_exists("query", $_POST))) {
        header('HTTP/1.1 400 Bad Request {"query": "param <query> is required"}');
        exit;
    }
    $queryKey = $_POST["query"];
}

while ($query = current($queries)) {
    if (key($queries) == $queryKey) {
        if (strpos($query, '?') !== false) {
            $params = array();
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                array_shift($_GET);
                $values = $_GET;
            } else {
                array_shift($_POST);
                $values = $_POST;
            }
            foreach ($values as $key => $value) {
                $params[]=$value;
            }
            mysql::query($query, $params);
        } else {
            mysql::query($query);
        }
        exit();
    }
    next($queries);
}
