<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
$connection = include ('db.inc.php');
$input = $_POST['input'];
$sql = "SELECT * FROM poi WHERE NAME LIKE '%$input%' GROUP BY NAME LIMIT 5";

try{
    $messages = array();
    $result = mysqli_query($connection ,$sql);
    if($result){
        while($row = mysqli_fetch_assoc($result)) {

        $message = array(
            "name"=> $row["NAME"],
            "cat"=> $row["KATEGORIE"],
            "lng"=> $row["LATITUDE"],
            "lat"=> $row["LONGITUDE"],
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