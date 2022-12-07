<?php
header('Content-Type: application/json; charset=utf-8');
// Speichern der Daten
// Annahme es geht alles gut :-)
$ajaxSpeichernSummary = array(
    "message"=>"Undefiined",
    "speicherStatus"=> false
);
$verbindung = include ('db.inc.php');
$table    = "user";

//echo "NewUserHatGeklappt";
if (isset($_GET["user_name"])&& isset($_GET["password"])){
    /* Get username */
    //print($_GET["user_name"]);
    //print ($_GET["password"]);
    $uname = $_GET['user_name'];
    /* Query */

    $query = "select count(*) as cntUser from user where name = '$uname'";
    //print $query;
    $result = mysqli_query($verbindung ,$query);
    $row = mysqli_fetch_array($result);
    $count = $row['cntUser']; //echo $count;

    if($count == 0){
        $name = urldecode(htmlspecialchars($_GET["user_name"]));
        $password = $_GET["password"];
        //echo "<br>Verbindung User hergestellt.";
        //print $name;
        //print $password;
        $sql = "INSERT INTO $table (name , password) VALUES ('$name', '$password')";
        //print $sql;
        $result = mysqli_query($verbindung, $sql);
        echo ("User wurde erfolgreich angelegt");
        //$ajaxSpeichernSummary["message"] = "User wurde erfolgreich gespeichert";
        //$ajaxSpeichernSummary["speicherStatus"] = true;
    }else {
        echo ("User existiert bereits, bitte wählen sie einen anderen Benutzernamen");
        //$ajaxSpeichernSummary["message"] = "User existiert bereits, bitte wählen sie einen anderen Benutzernamen";
        //$ajaxSpeichernSummary["speicherStatus"] = false;
    }
/*
    if($result){
        $ajaxSpeichernSummary['message'] = "Daten wurden Erfolgreich gespeichert";
        $ajaxSpeichernSummary['speicherStatus'] = true;
    } else{
        $ajaxSpeichernSummary['message'] = "Daten wurden nicht gespeichert - DB Problem ";
        $ajaxSpeichernSummary['speicherStatus'] = false;
    }
*/
}else {
    echo ("Bitte überprüfen Sie Ihre Angaben");
    $ajaxSpeichernSummary['message'] = "Daten wurden nicht gespeichert - Daten fehlerhaft";
    $ajaxSpeichernSummary['speicherStatus'] = false;
}

$json = json_encode($ajaxSpeichernSummary);

//print($json);
mysqli_close ($verbindung);

?>

