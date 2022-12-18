<?php
   //header('Content-Type: application/json; charset=utf-8');

    $verbindung = include ('db.inc.php');
    $table    = "stationen_hamburg";


    $messages = array();

    $sql = "SELECT * FROM $table";
    
    $result = mysqli_query($verbindung, $sql);

    if($result){
        while($row = mysqli_fetch_assoc($result)) {
            $message = array(
                "id"=>$row['RENTAL_ZONE_HAL_ID'],
                "POI_Name"=>$row['NAME'],
                "lat"=>floatval($row['LATITUDE']),
                "long"=>floatval($row['LONGITUDE']));
                array_push($messages,$message);
        }
    }

    mysqli_close ($verbindung);   
    $json = json_encode($messages);
    print($json);
?>