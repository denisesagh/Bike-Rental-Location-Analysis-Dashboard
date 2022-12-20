<?php
   header('Content-Type: application/json; charset=utf-8');

   //Function Abfrage
    function getData($result, $type, $messages){
        if($result){
            while($row = mysqli_fetch_assoc($result)) {
                $message = array(
                    "Type"=> "$type",
                    "id"=>$row['RENTAL_ZONE_HAL_ID'],
                    "POI_Name"=>$row['NAME'],
                    "lat"=>floatval($row['LATITUDE']),
                    "long"=>floatval($row['LONGITUDE']));
                array_push($messages,$message);
            }
        }
        return $messages;
    }

    function getDataPOI($result, $type, $messages){
        if($result){
            while($row = mysqli_fetch_assoc($result)) {
                $message = array(
                    "Type"=> "$type",
                    "id"=>$row['STATION_ID'],
                    "POI_Name"=>$row['NAME'],
                    "lat"=>floatval($row['POI_LAT']),
                    "long"=>floatval($row['POI_LNG']),
                    "kategorie"=>$row['KATEGORIE'],
                    "fclass"=>$row['FCLASS']);
                array_push($messages,$message);
            }
        }
        return $messages;
    }


    //DB-Verbindung
    $verbindung = include ('db.inc.php');

    //GeoDaten
    $latStart= $_GET['lat1'];
    $latEnd= $_GET['lat2'];
    $longStart = $_GET['long1'];
    $longEnd = $_GET['long2'];


    //FahrradStationen
    $tableFStation    = "stationen_hamburg";
    $messagesFStation = array();
    $sql = "SELECT * FROM $tableFStation WHERE LATITUDE >= $latStart and LATITUDE <= $latEnd and LONGITUDE >= $longStart and LONGITUDE <= $longEnd";
    $result = mysqli_query($verbindung, $sql);

    $messagesFStation = getData($result, "Fahrradstation", $messagesFStation);



    //POIs
    $tablePOI= "poi";
    $messagesPOI = array();
    $sql = "SELECT * FROM $tablePOI WHERE POI_LAT >= $latStart and POI_LAT <= $latEnd and POI_LNG >= $longStart and POI_LNG <= $longEnd";
    $result = mysqli_query($verbindung, $sql);

    $messagesPOI = getDataPOI($result, "POI", $messagesPOI);


    //return Arrays
    mysqli_close ($verbindung);
    $json = json_encode($messagesFStation + $messagesPOI);
    print($json);
?>