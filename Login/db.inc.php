<?php
    $server = "localhost";
    $user   = "root";
    $pass   = "";
    $db     = "test_user";
	$verbindung = new mysqli($server , $user , $pass , $db) or die ("Konnte Verbindung zur Datenbank nicht herstellen!");
    //echo "<br>Verbindung hergestellt.";
    return $verbindung;
?>



















