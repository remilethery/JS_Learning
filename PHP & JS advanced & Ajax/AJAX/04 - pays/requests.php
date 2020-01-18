<?php

$pdo = new PDO( // PHP DATABASE OBJECT
    "mysql:host=localhost;dbname=pays",
    "root",
    "",
    array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, // ERRMODE_SILENT en prod
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    )
);


$resultat = array();
$resultat["resultats"] = array();

// On va comparer en lower caractère - pour ça on utilise la fonction SQL
$sql = $pdo->prepare("SELECT * 
                      FROM country 
                      WHERE LOWER (countryName) 
                      LIKE LOWER( CONCAT('%', :recherche, '%') )
                      LIMIT 0,10 
                    ");

$sql->execute(array(
    "recherche" => $_POST["recherche"]
));

$resultat["resultats"] = $sql->fetchAll();

echo json_encode($resultat);


?>