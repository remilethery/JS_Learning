<?php

require_once('inc/init.php');
if( !isset($_SESSION['pseudo']) ){
    header('location:connexion.php');
    exit();
}
require_once('header.php');
// ici la page
?>
<h5 class="mt-4">Connecté en tant que <?= $_SESSION['pseudo'] ?>  <a href="<?= URL .'profil.php' ?>" id="edit">&#9881;</a></h5>
<!-- le tchat -->
<div class="row d-flex">
    <div id="message_tchat" class="col-md-8 principal bg-dark text-light px-4 py-2 order-1 order-md-0"></div>
    <div id="liste_membre_connecte" class="col-md-4 principal bg-dark text-light px-4 py-2 order-0 order-md-1"></div>
</div>
<div class="row">
    <div class="col">
       <img class="smiley" src="smil/smiley1.png" alt=":)">
       <img class="smiley" src="smil/smiley2.png" alt=":(">
       <img class="smiley" src="smil/smiley3.png" alt=";)">
    </div>    
</div>
<div id="formulaire_tchat">
    <form method="post" action="" class="row px-2 py-2">
        <div class="col-md-8">
            <input type="text" id="message" name="message" class="form-control" autocomplete="off">
        </div>
        <div class="col-md-4 mt-3 mt-md-0 d-flex align-items-center justify-content-center">
            <input type="submit" name="envoi" id="submit" value="Envoi" class="btn btn-primary btn-sm d-block mx-auto">
            <button type="button" id="deco_button" class="btn btn-warning btn-sm d-block mx-auto">Déconnecter</button>
        </div>
    </form>
</div>


<?php
require_once('footer.php');