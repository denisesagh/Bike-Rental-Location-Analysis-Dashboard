<?php
    $server = "mysql32.1blu.de";
    $user   = "s13429_3419899";
    $pass   = "LaurenzHat2022E!nS!cheresPasswort";
    $db     = "db13429x3419899";
	$verbindung = new mysqli($server , $user , $pass , $db) or die ("Konnte Verbindung zur Datenbank nicht herstellen!");
    //echo "<br>Verbindung hergestellt.";
    return $verbindung;
?>



















