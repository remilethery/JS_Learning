<?php

// Ouvrir ou récupérer la session
session_start();

// connexion BDD
$pdo = new PDO(
    'mysql:host=localhost;dbname=chat',
    'root',
    '',
    array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, // ERRMODE_SILENT
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    )
);

// Définition de l'url
define('URL','/ajax/tchat/');

// function de calcul de l'age
function age($naiss){
    $today = new DateTime();
    $date_naiss = new DateTime($naiss);
    $age = $today->diff($date_naiss);
    return $age->format('%y');
}

