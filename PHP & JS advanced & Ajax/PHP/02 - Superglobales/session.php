<?php
// Démarrer une session ou récupérer une session précédemment ouverte
session_start();


/*
crée un cookie PHPSESSID
// bf6j7grdjdskin6o6j2v5l5q5p
crée un fichier côté serveur
// C:\wamp64\tmp\sess_bf6j7grdjdskin6o6j2v5l5q5p
*/

$_SESSION["user"] = "Gégé";
$_SESSION["ville"] = "Bourg la Run";
var_dump($_SESSION);