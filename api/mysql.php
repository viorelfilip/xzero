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
            $stmt = self::$conn->prepare($sql);
            $rows = array();
            $result = null;
            /* check connection */
            if (mysqli_connect_errno()) {
                $errMsg = mysqli_connect_error();
                header("HTTP/1.1 500 mysql::connect(): $errMsg");
                exit();
            }
            if (!empty($params)) {
                $types = str_repeat('s', count($params)); // bind all as string
                $stmt->bind_param($types, ...$params); // bind array at once;
            }
            $stmt->execute();
            $result = $stmt->get_result();
            if (!empty($result)) { // SELECT || stored procedure
                while ($row = $result->fetch_assoc()) {
                    $rows[] = $row;
                }
                mysqli_free_result($result); // free the result set
                print json_encode($rows); // return as json array
            } else { // INSERT || UPDATE
                print '{"message":"'.$stmt->affected_rows.' affected rows"';
            }
            $stmt->close();
        }
    }
    mysql::connect();
