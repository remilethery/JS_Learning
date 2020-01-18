<?php
require_once("inc/init.php");
// Vérification de la connexion
if ( !isset($_SESSION["pseudo"]) ) {
    header("location:connexion.php");
    exit(); // Stoppe complètement l'exécution du script PHP
}

require_once("header.php");

// Ici c'est (Paris) la page
?>
<h5 class="mt-4 text-center">Connecté en tant que 
        <a href="<?= URL . 'profil.php' ?>">
        <?= $_SESSION["pseudo"] ?></a></h5>



<!-- Le chat ici  - Demander pour mettre des bordures en mode light-->
<div class="row d-flex">
    <div id="message_chat" 
         class="col-md-8 principal bg-light text-dark px-4 py-2 order-1 order-md-0"></div>
    <div id="liste_membre_connecte" 
         class="col-md-4 principal bg-light text-dark px-4 py-2 order-0 order-md-1"></div>
</div>

<div class="row">
    futurs smileys
</div>

<div id="formulaire_chat">
    <form method="post" action="" class="row">
        <div class="col-md-8">
            <input type="text" id="message" name="message" class="form-control">
        </div>
        <div class="col-md-4 mt-3 mt-md-0 d-flex 
                    align-items-center justify-content-center">
            <input type="submit" name="envoi" 
                   id="submit" value="Envoi"
                   class="btn btn-primary btn-sm d-block mx-auto">
            <button type="button" id="deco_button"
                    class="btn btn-warning btn-sm">Déconnexion</button>
        </div>
    </form>
</div>

<?php
require_once("footer.php");


?>