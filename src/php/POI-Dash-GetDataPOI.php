<?php
   //header('Content-Type: application/json; charset=utf-8');

    $verbindung = include ('db.inc.php');
    $table    = "poi";


    $messages = array();

    $sql = "SELECT * FROM $table";
    
    $result = mysqli_query($verbindung, $sql);

    if($result){
        while($row = mysqli_fetch_assoc($result)) {
            $message = array(
                "id"=>$row['STATION_ID'],
                "POI_Name"=>$row['NAME'],
                "lat"=>floatval($row['POI_LAT']),
                "long"=>floatval($row['POI_LNG']),
                "kategorie"=>$row['KATEGORIE'],
                "fclass"=>$row['FCLASS']);
                array_push($messages,$message);
        }
    }

    mysqli_close ($verbindung);   
    $json = json_encode($messages);
    print($json);
?>