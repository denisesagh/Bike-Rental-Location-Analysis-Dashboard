<?php
//NOCH IN BEARBEITUNG
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
$verbindung = include('db.inc.php');
$loadUserPOIs = $_POST['loadUserPOIs'];
$userID = $_POST['userID'];


if ($loadUserPOIs == "success" && $userID != "") {
    try {

            $sql = "SELECT * FROM `poi` WHERE `USERID` = '$userID'";
            $sql2 = "SELECT COUNT(*) FROM `poi` WHERE `USERID` = '$userID'";
            $result = mysqli_query($verbindung, $sql);
            $resultArray = mysqli_fetch_array($result, $sql2);
            //$poiNameReturnDatabase = $resultArray['USERID'];
        echo json_encode(array("reply" => $resultArray));
        } catch (Exception $e) {
            echo json_encode(array("reply" => "error"));
    } catch (Exception $e) {
        echo json_encode(array("reply" => $e));
    }
}