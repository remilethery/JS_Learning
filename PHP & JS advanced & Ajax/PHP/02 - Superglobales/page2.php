<h1>Page2</h1>

<?php 
// Les superglobales commencent toutes par $_ et utilisent des MAJ

// Superglobale $_GET
// Contient l'id de la page appelante, 
// permet de récupérer des informations non confidentielles
/* Ici
array (size=2)
  'produit' => string 'robe' (length=4)
  'couleur' => string 'bleu' (length=4)
  */

var_dump($_GET);

/*
    La superglobale $_GET 
    - est un array 
    - récupère ce qui suit le ? dans l'url
    - associe index et valeur
*/


?>
