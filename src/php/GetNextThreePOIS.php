<?php
header('Content-Type: application/json; charset=utf-8');

    function getData($result, $messages){
        if($result){
            while($row = mysqli_fetch_assoc($result)) {
                $message = array(
                    "name"=>$row['NAME'],
                    "lat"=>floatval($row['LATITUDE']),
                    "long"=>floatval($row['LONGITUDE']),
                    "kategorie"=>$row['KATEGORIE']);
                array_push($messages,$message);
            }
        }
        return $messages;
    }

    function getBikeID($result){
        if($result){
                return intval(mysqli_fetch_assoc($result)['RENTAL_ZONE_HAL_ID']);
        }
    }


    $long = $_GET['long'];
    $lat = $_GET['lat'];

    $verbindung = include ('db.inc.php');
    //"SELECT * FROM stationen_hamburg WHERE LATITUDE = $lat and LONGITUDE = $long"
    $SQL_ID = "SELECT * FROM stationen_hamburg WHERE FORMAT(LATITUDE, 3) = FORMAT($long,3) and FORMAT(LONGITUDE, 3) = FORMAT($lat,3);";

    $result_ID = mysqli_query($verbindung, $SQL_ID);
    $ID = getBikeID($result_ID);

    //echo ($SQL_ID);
    $SQL = "SELECT p.* FROM poi p
            inner join stationen_hamburg s
            on p.STATION_ID = s.RENTAL_ZONE_HAL_ID WHERE p.STATION_ID = $ID ORDER BY p.ENTFERNUNG ASC LIMIT 3";
    $result = mysqli_query($verbindung, $SQL);

    $emptyArray = array();
    $PointsArray = getData($result, $emptyArray);

    $SQL_Bike = "SELECT * FROM stationen_hamburg";
    $result_Bike = mysqli_query($verbindung, $SQL_Bike);
    $bikeArray = array();
    $bikeArray = getData($result_Bike, $bikeArray);

    mysqli_close ($verbindung);
    $json = json_encode($PointsArray + $bikeArray);
    print($json);

?>