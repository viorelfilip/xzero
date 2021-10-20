<?php
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

    class MySQL
    {
        // property declaration
        private $conn;

        // constructor
        public function __construct()
        {
            try {
                $this->conn=mysqli_init();
                mysqli_real_connect($this->conn, "gamedb.mysql.database.azure.com", "viorelfilip@gamedb", "Indeco@2020", "xzero", 3306);
                //echo "MySQL conection completed";
            } catch (Exception $e) {
                echo 'Connection Exception: ',  $e->getMessage(), "\n";
            }
        }
        // method declaration
        public function query($sql)
        {
            /* check connection */
            if (mysqli_connect_errno()) {
                printf("Connect failed: %s\n", mysqli_connect_error());
                exit();
            }
            if ($result = mysqli_query($this->conn, $sql)) {
                $rows = array();
                while ($r = mysqli_fetch_assoc($result)) {
                    $rows[] = $r;
                }
                mysqli_free_result($result); // free the result set
                print json_encode($rows); // return as json array
            }
        }
    }
    $mysql = new MySQL();
