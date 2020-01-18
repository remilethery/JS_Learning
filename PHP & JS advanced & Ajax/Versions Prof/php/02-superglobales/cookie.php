<?php

// Poser un cookie
$expiration = time() + 3 * 24 * 60 * 60;
// maintenant + 3 jours
var_dump($expiration);
//  3 jours
setCookie('langue','fr', $expiration);

var_dump($_COOKIE);
//  pas d'infos sensibles dans un cookie

