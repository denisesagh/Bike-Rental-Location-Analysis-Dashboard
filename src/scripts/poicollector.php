<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
$connection = include ('db.inc.php');
$query = $_POST['query'];
try{
    $messages = array();
    $result = mysqli_query($connection ,$query);
    if($result){
        while($row = mysqli_fetch_assoc($result)) {

        $message = array(
            "name"=> $row["NAME"],
            "cat"=> $row["KATEGORIE"],
            "lng"=> $row["POI_LNG"],
            "lat"=> $row["POI_LAT"],
            "sid"=> $row["STATION_ID"],
            "uid"=> $row["USERID"]);
            array_push($messages,$message);
        }
    mysqli_close ($connection);
    $json = json_encode($messages);
    echo($json);
    }
}catch (Exception $e){
    echo json_encode($messages);
}
?>