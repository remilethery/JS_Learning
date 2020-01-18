<?php

// démarrer une session ou récupérer une session precédemment ouverte
session_start();
/*
créé un cookie PHPSESSID

valeur : o1uquj5vdtjuv54vo66cngan4p
sess_o1uquj5vdtjuv54vo66cngan4p

crée un fichier coté serveur
*/
$_SESSION['user'] = 'Fred';
$_SESSION['ville'] = 'Cergy';
var_dump($_SESSION);