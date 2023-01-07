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

    function createSQL($value, $latStart, $latEnd, $longStart, $longEnd){
        return "SELECT * FROM poi WHERE LATITUDE >= $latStart and LATITUDE <= $latEnd and LONGITUDE >= $longStart and LONGITUDE <= $longEnd and KATEGORIE = '$value' and USERID=0";
    }



    $verbindung = include ('db.inc.php');

    $longPOI = $_GET['longPOI'];
    $latPOI = $_GET['latPOI'];
    $latStart= $_GET['lat1'];
    $latEnd= $_GET['lat2'];
    $longStart = $_GET['long1'];
    $longEnd = $_GET['long2'];
    $filterOptions = $_GET['kategorie'];

    //GetNextThreeBikeStations
    $SQL = "SELECT *, SQRT(POW(69.1 * (LATITUDE - $longPOI), 2) + POW(69.1 * ($latPOI - LONGITUDE) * COS(LATITUDE / 57.3), 2)) 
    AS distance FROM stationen_hamburg HAVING distance < 25 ORDER BY distance LIMIT 3";
    $result = mysqli_query($verbindung, $SQL);
    $bikeStationArray = array();
    $bikeStationArray = getData($result, $bikeStationArray);

    //GetPOIs in View
    $PointsArray = array();
    foreach ($filterOptions as $value) {
        $result = mysqli_query($verbindung, createSQL($value, $latStart, $latEnd, $longStart, $longEnd));
        $PointsArray += getData($result, $PointsArray);
    }

    shuffle($PointsArray);
    mysqli_close ($verbindung);
    $json = json_encode($bikeStationArray + $PointsArray);
    print($json);