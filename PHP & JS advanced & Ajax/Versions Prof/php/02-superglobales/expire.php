<?php

session_start();

echo "Timestamp actuel : " . time() . "<br>";

if( isset($_SESSION['temps']) ){
    // la session existe
    if( time()  > $_SESSION['temps'] + $_SESSION['limite']){
        // la session expire
        session_destroy(); // prend effet à la fin du script
        echo "Déconnexion pour inactivité";
    }
    else{
        // la session est prolongée
        $_SESSION['temps'] = time();
        echo "Connexion mise à jour. 10 secondes supplémentaires";
    }
}
else{
    echo "Connexion";
    $_SESSION['temps'] = time();
    $_SESSION['limite'] = 10;    
}