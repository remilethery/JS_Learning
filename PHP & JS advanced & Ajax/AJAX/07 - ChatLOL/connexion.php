<?php



require_once("inc/init.php");
// Si on est déjà connecté en mode session
if ( isset($_SESSION["pseudo"]) ) {
    header("location:".URL);
    exit(); // Stoppe complètement l'exécution du script PHP
}

require_once("header.php");

// ICI C'est la page

    // Intercepter le POST
    if (!empty($_POST)) {
        $msg = array();

        if (empty($_POST["pseudo"]) || empty($_POST["mdp"])) {
            $msg[] = "Merci d'entrer votre pseudo et mot de passe.";
        } else {

            $resultat = array();      

            // Controler le pseudo 
            $resultat = $pdo->prepare("SELECT *
                                       FROM membre
                                       WHERE pseudo=:pseudo");
            $resultat->execute(array(
                "pseudo" => htmlspecialchars( $_POST["pseudo"])
            ));
            
            if ( ($resultat->rowCount() == 1)){
                // On a trouvé le pseudo
                $infos = array();
                // fetch ici récupère 1 seule ligne, donc pas besoin de parcourir
                $infos = $resultat->fetch();
              //  var_dump($infos);
                // Check du mot de passe
                if ( password_verify($_POST["mdp"], $infos["password"]) )
                {
                    // Redirection en mode connecté
                    $_SESSION["id_membre"] = $infos["id_membre"];
                    $_SESSION["pseudo"] = htmlspecialchars( $_POST["pseudo"]);

                    // Mise à jour de la date d'activité
                    $pdo->query("UPDATE membre 
                                 SET date_activite=".time().
                                 " WHERE id_membre=".$infos["id_membre"]);


                    // Ajout en session de l'id de départ
                    $requete = $pdo->query("SELECT MAX(id_dialogue) as lastid 
                                            FROM dialogue");
                    $_SESSION["startid"] = $requete->fetch()["lastid"];
                    // redirection
                    header("location:".URL);
                    exit();
                } else { // Le mot de passe n'est pas bon, 
                            // mais on diffuse le même message d'erreur que pour le pseudo pour
                            // ne pas aider les éventuels hackers
                    $msg[] = "Erreur sur les identifiants.";
                }
                

            } else { // Le Pseudo n'existe pas dans la base, on diffuse un message d'erreur
                $msg[] = "Erreur sur les identifiants.";
            }
        }
    }

    if (!empty($msg)) {
        ?>
        <div class="alert alert-danger mt-4"><?= implode('<br>',$msg) ?></div>
        <?php
    }

?>

<!-- .row>.col-md-8.offset-md-2 -->

<div class="row">
    <div class="col-md-8 offset-md-2 d-flex flex-column justify-content-center
                align-items-center pt-2 pb-3">
    <form method="post" action="" class="mx-4 my-4">
        <div class="form-group">
            <label for="pseudo">Pseudo</label>
            <input type="text" id="pseudo" name="pseudo" class = "form-control">
        </div>
        <div class="form-group">
            <label for="mdp">MdP</label>
            <input type="password" id="mdp" name="mdp" class = "form-control">
        </div>
        <input type="submit" value="Connexion"
            class="btn btn-primary d-block mx-auto w-100">
    </form>
    <p> Pas encore de compte ? <a href="<?= URL . 'inscription.php' ?>">Inscris-toi ici pour slacker entre amis !</a>

    </div>
</div>


<?php
require_once("footer.php");

?>
