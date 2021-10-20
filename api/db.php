<?php
    ini_set("display_errors", 1);
    error_reporting(E_ALL);
    $con=mysqli_init(); 
    mysqli_ssl_set($con, NULL, NULL, {ca-cert filename}, NULL, NULL); 
    mysqli_real_connect($con, "gamedb.mysql.database.azure.com", "viorelfilip@gamedb", Indeco@2020, xzero, 3306);
    echo "Totul OK";
?>
