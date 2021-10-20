<?php
include_once 'mysql.php';

$users = 'select * from users';
$games = 'select * from games';

if (!(array_key_exists("table", $_GET))){
    header('HTTP/1.1 400 Bad Request {"table": "param <table> is required"}');
    exit;
}

$query = (array_key_exists("table", $_GET)) ? $_GET["table"]: "";
$mysql->query($$query);
