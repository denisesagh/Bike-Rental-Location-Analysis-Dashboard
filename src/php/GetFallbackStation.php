<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
$connection = include('db.inc.php');
$lat = $_GET['latitude'];
$lng = $_GET['longitude'];

$sql = "SELECT *, SQRT(POW(69.1 * (LATITUDE - $lng), 2) + POW(69.1 * ($lat - LONGITUDE) * COS(LATITUDE / 57.3), 2)) 
    AS distance FROM stationen_hamburg HAVING distance < 25 ORDER BY distance LIMIT 2";

try {
    $messages = array();
    $result = mysqli_query($connection, $sql);
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

        mysqli_close($connection);
        $json = json_encode($messages);
        echo($json);
    }
} catch (Exception $e) {
    echo json_encode($messages);
}

?>