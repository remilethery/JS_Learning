<?php


// Ouvrir ou récupérer la session
session_start();


// Connexion BDD

$pdo = new PDO( // PHP DATABASE OBJECT
    "mysql:host=localhost;dbname=chat",
    "root",
    "",
    array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, // ERRMODE_SILENT en prod
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    )
);

// Définition de l'URL
define ("URL", "/MonSiteAjax/AJAX/07 - ChatLOL/");

// Vérification de l'âge
function age($naiss) {
    $today = new DateTime();
    $dateNaiss = new DateTime($naiss);
    $age = $today->diff($dateNaiss);
    return $age->format('%y');
}



?>