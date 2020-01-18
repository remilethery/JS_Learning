<?php

$pdo = new PDO(
    'mysql:host=localhost;dbname=monde',
    'root',
    '',
    array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, // ERRMODE_SILENT
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    )
);

$resultat = array();
$resultat['resultats'] = array();
$sql = $pdo->prepare("SELECT * FROM country WHERE LOWER(countryName) LIKE LOWER( CONCAT('%',:recherche,'%') ) LIMIT 0,10");
$sql->execute(array(
    'recherche' => $_POST['recherche']
));
$resultat['resultats'] = $sql->fetchAll();
echo json_encode($resultat);
