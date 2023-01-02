<?php
header('Content-Type: application/json; charset=utf-8');

function createSQL($value, $table, $latStart, $latEnd, $longStart, $longEnd, $userID){
    switch ($value){
        case "Persönliche":
            return "SELECT * FROM $table WHERE LATITUDE >= $latStart and LATITUDE <= $latEnd and LONGITUDE >= $longStart and LONGITUDE <= $longEnd and USERID=$userID";
        case "empty":
            return "SELECT * FROM $table WHERE LATITUDE >= $latStart and LATITUDE <= $latEnd and LONGITUDE >= $longStart and LONGITUDE <= $longEnd";
        default:
            return "SELECT * FROM $table WHERE LATITUDE >= $latStart and LATITUDE <= $latEnd and LONGITUDE >= $longStart and LONGITUDE <= $longEnd and KATEGORIE = '$value'";
    }
}
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


//GeoDaten
$latStart= $_GET['lat1'];
$latEnd= $_GET['lat2'];
$longStart = $_GET['long1'];
$longEnd = $_GET['long2'];
$userID = $_GET['userID'];
$filterOptions = $_GET['filterArray'];

$verbindung = include ('db.inc.php');
$tables= ["table1" => "poi",
    "table2" => "stationen_hamburg"];
$PointsArray = array();

foreach ($tables as $table) {
    foreach ($filterOptions as $value) {
        $result = mysqli_query($verbindung, createSQL($value, $table, $latStart, $latEnd, $longStart, $longEnd, $userID));
        $PointsArray += getData($result, $PointsArray);
    }
}



//return Arrays
mysqli_close ($verbindung);
$json = json_encode($PointsArray);
print($json);
?>