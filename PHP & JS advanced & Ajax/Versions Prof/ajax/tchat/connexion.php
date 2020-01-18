<?php

require_once('inc/init.php');
// Si je suis déjà connecté => index
if( isset($_SESSION['pseudo']) ){
    header('location:'.URL);
    exit();
}


$msg = array();
// 1. Intercepter le post
if(!empty($_POST)){
    if( !empty($_POST['pseudo']) && !empty($_POST['mdp'])){
        // 2. Contrôler le pseudo
        $resultat = $pdo->prepare("SELECT * FROM membre WHERE pseudo=:pseudo");
        $resultat->execute(array('pseudo'=> htmlspecialchars($_POST['pseudo'])));
        if( $resultat->rowCount() == 1 ){
            $membre = $resultat->fetch();
            // 3. Controler le mdp  
            if( password_verify($_POST['mdp'],$membre['password']) ){
                $_SESSION['pseudo'] = $membre['pseudo'];
                $_SESSION['id_membre'] = $membre['id_membre'];
                // Mise à jour de la date d'activité
                $pdo->query("UPDATE membre SET date_active=".time()." WHERE id_membre=".$membre['id_membre']);
               
                // Ajout en session de l'id de départ
                $r = $pdo->query("SELECT MAX(id_dialogue) as lastid FROM dialogue");
                $_SESSION['startid'] = $r->fetch()['lastid'];

                // 4. Redirection en mode connecté
                header('location:'.URL);
               exit();

            } else{
                $msg[] = 'Erreur sur les identifiants'   ;
            } 
        }
        else{
            $msg[] = 'Erreur sur les identifiants'   ;
        }  
    }
    else{
        $msg[] = 'Merci de saisir vos identifiants';
    }


}


require_once('header.php');
if(!empty($msg)){
    ?>
    <div class="alert alert-danger mt-3"><?= implode('<br>',$msg) ?></div>
    <?php
}

// ici la page
?>
<!-- .row>.col-md-8.offset-md-2 -->
<div class="row">
    <div class="col-md-8 offset-md-2 d-flex flex-column justify-content-center align-items-center pt-2 pb-3">
    <form method="post" action="" class="mx-4 my-4">
        <div class="form-group">
            <label for="pseudo">Pseudo</label>
            <input type="text" id="pseudo" name="pseudo" class="form-control">
        </div>
        <div class="form-group">
            <label for="mdp">Mot de passe</label>
            <input type="password" id="mdp" name="mdp" class="form-control">
        </div>
        <input type="submit" value="connexion" class="btn btn-primary d-block mx-auto w-100">
    </form>
    <p>Pas encore de compte ? <a href="<?= URL . 'inscription.php' ?>">Inscrivez vous ici</a>
    </div>
</div>

<?php
require_once('footer.php');