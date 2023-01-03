<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
$verbindung = include('db.inc.php');
$registration = $_POST['registration'];
$name= $_POST['name'];
$password = $_POST['password'];



if ($registration == "success"){
    // some action goes here under php
    try{
        $getPasswordHashFromUsername = "select password from User WHERE username='$name'";
        $result = mysqli_query($verbindung ,$getPasswordHashFromUsername);
        $passwordHashArray = mysqli_fetch_array($result);
        $passwordHash = $passwordHashArray['password'];

        if ($passwordHash == $password) {
            $getUserIdFromUsername = "select user_id from User WHERE username='$name'";
            $result = mysqli_query($verbindung ,$getUserIdFromUsername);
            $userIdArray = mysqli_fetch_array($result);
            $userId = $userIdArray['user_id'];
            echo json_encode(array("id" => $userId));
        }
    }catch (Exception $e){
        echo json_encode(array("id" => "error"));
    }

}