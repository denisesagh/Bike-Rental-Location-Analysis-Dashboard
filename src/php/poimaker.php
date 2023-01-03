<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
$verbindung = include('db.inc.php');
$make = $_POST['make'];
$poiname = $_POST['poiname'];
$poilong = $_POST['poilong'];
$poilat = $_POST['poilat'];
$userid = $_POST['userid'];



if ($make == "make"){
    // some action goes here under php
    try{

        $sql = "INSERT INTO `poi` (`NAME`, `LATITUDE`, `LONGITUDE`, `KATEGORIE`, `FCLASS`, `STATION_ID`, `USERID`) 
        VALUES ('$poiname', '$poilat' , '$poilong', 'CustomUserPOI', 'NULL', 'NULL' , '$userid');";
        $result = mysqli_query($verbindung ,$sql);
        //$resultArray = mysqli_fetch_array($result);
        //$poiNameReturnDatabase = $resultArray['NAME'];

        echo json_encode(array("reply" => $sql));
    }catch (Exception $e){
        echo json_encode(array("reply" => "error"));
    }

}