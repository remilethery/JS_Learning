<?php

// Poser un cookie
$expiration = time() + 3 * 24 * 60 * 60; // Découpage des secondes pour 3 jours
var_dump($expiration);

// On pose le cookie
setCookie("langue", "fr", $expiration);

// 3 jours
var_dump($_COOKIE);

// !!!! Pas d'information sensible dans un cookie !!!!! //