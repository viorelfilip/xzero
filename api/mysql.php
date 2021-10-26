<?php
    class mysql
    {
        // property declaration
        private static $conn;
        private static $host="gamedb.mysql.database.azure.com";
        private static $user="viorelfilip@gamedb";
        private static $pass="Indeco@2020";
        private static $db="xzero";
        private static $port=3306;

        // constructor
        public static function connect()
        {
            try {
                self::$conn=mysqli_init();
                mysqli_real_connect(self::$conn, self::$host, self::$user, self::$pass, self::$db, self::$port);
                //echo "MySQL conection completed";
            } catch (Exception $e) {
                echo 'Connection Exception: ',  $e->getMessage(), "\n";
                exit();
            }
        }
        // method declaration
        public static function query($sql, $params=null)
        {
            $rows = array();
            $result = null;
            /* check connection */
            if (mysqli_connect_errno()) {
                $errMsg = mysqli_connect_error();
                header("HTTP/1.1 500 mysql::connect(): $errMsg");
                exit();
            }
            if (!empty($params)) {
                $stmt = self::$conn->prepare($sql);
                // foreach ($params as $p) {
                //     $stmt->bind_param('s', $p); // bind all as string
                // }
                $types = str_repeat('s', count($params)); // bind all as string
                $stmt->bind_param($types, ...$params); // bind array at once;
                $stmt->execute();
                $result = $stmt->get_result();
            } else {
                $result = mysqli_query(self::$conn, $sql);
            }
            // while ($row = $result->fetch_assoc()) {
            //     $rows[] = $row;
            // }
            // mysqli_free_result($result); // free the result set
            if (!empty($stmt)) {
                $stmt->close();
            }
            print json_encode($rows); // return as json array
        }
    }
    mysql::connect();