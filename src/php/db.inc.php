<?php

 // Dies sind die Standart Zugangsdaten bei Verwendung von XAMPP
    $server = "mysql32.1blu.de";
    $user   = "s13429_3419899";
    $pass   = "LaurenzHat2022E!nS!cheresPasswort";
    $db     = "db13429x3419899";

// In diesem Schritt wird die Verbindung zur Datenbank hergestellt. Der Operator "DIE" sorgt bei Fehlschlag für eine 
	
	$verbindung = new mysqli($server , $user , $pass , $db) or die ("Konnte Verbindung zur Datenbank nicht herstellen!");
    
    //echo "<br>Verbindung hergestellt.";
    return $verbindung;
?>



















