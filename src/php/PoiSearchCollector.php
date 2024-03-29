<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
$connection = include('db.inc.php');
$input = $_POST['input'];
$uid = $_POST['uid'];
$sql = "SELECT * FROM poi WHERE NAME LIKE '%$input%' AND (USERID = 0 OR USERID = $uid) GROUP BY NAME LIMIT 4";
$sql2 = "SELECT * FROM stationen_hamburg WHERE NAME LIKE '%$input%' GROUP BY NAME LIMIT 1";

try {
    $messages = array();
    $result = mysqli_query($connection, $sql);
    $result2 = mysqli_query($connection, $sql2);
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {

            $message = array(
                "name" => $row["NAME"],
                "cat" => $row["KATEGORIE"],
                "lng" => $row["LATITUDE"],
                "lat" => $row["LONGITUDE"],
                "uid" => $row["USERID"]);
            array_push($messages, $message);
        }

        if ($result2) {
            while ($row = mysqli_fetch_assoc($result2)) {
                $message = array(
                    "name" => $row["NAME"],
                    "cat" => $row["KATEGORIE"],
                    "lng" => $row["LATITUDE"],
                    "lat" => $row["LONGITUDE"],
                    "uid" => $row["USERID"]);
                array_push($messages, $message);
            }
        }
        mysqli_close($connection);
        $json = json_encode($messages);
        echo($json);
    }
} catch (Exception $e) {
    echo json_encode($messages);
}
?>