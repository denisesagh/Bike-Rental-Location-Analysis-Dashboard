<?php
header('Content-Type: application/json; charset=utf-8');

    $ID = $_GET['ID'];


    $verbindung = include ('db.inc.php');
    $SQL = "SELECT p.* FROM poi p
            inner join stationen_hamburg s
            on p.STATION_ID = s.RENTAL_ZONE_HAL_ID WHERE p.STATION_ID = $ID ORDER BY p.ENTFERNUNG ASC";
    $result = mysqli_query($verbindung, $SQL);


    $PointsArray = getData($result, array());

    mysqli_close ($verbindung);
    $json = json_encode($PointsArray);
    print($json);
?>