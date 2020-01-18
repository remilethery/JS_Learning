<?php

require_once("inc/init.php");

// Si on est déjà connecté en mode session
if ( isset($_SESSION["pseudo"]) ) {
    header("location:".URL);
    exit(); // Stoppe complètement l'exécution du script PHP
}

if (!empty($_POST)) { // Bouton inscription utilisé


    $avatar = $_POST['memoavatar'] ?? '';

    if (!empty($_FILES['avatar']['name'])) {
        $avatar = $_POST['pseudo'] . '_' . $_FILES['avatar']['name'];
        // Mohamed represents
        $chemin = $_SERVER['DOCUMENT_ROOT'] . URL . 'avatars/';
        move_uploaded_file($_FILES['avatar']['tmp_name'], $chemin . $avatar);
    }

    $msg = array();
    $champ_vides = 0;
    foreach ($_POST as $value) {
        if (empty($value) && $index != 'memoavatar') {
            $champ_vides++;
        }
    }
    if ($champ_vides > 0) {
        $msg[] = "Il manque " . $champ_vides . " information". (($champ_vides>1)? "s":"");
    }

    if( iconv_strlen($_POST['mdp']) < 6 ){
        $msg[] = 'Le mot de passe doit contenir au moins 6 caractères';
    }


    if (empty($msg)) {
        //aucune erreur
        $resultat = $pdo->prepare("SELECT *
                                   FROM membre
                                   WHERE pseudo=:pseudo");
        $resultat->execute(array(
            "pseudo" => htmlspecialchars($_POST["pseudo"])
        ));

        if ( $resultat->rowCount() == 1 ) {
            $msg[] = "Pseudo déjà utilisé - Merci d'en choisir un autre &#128521;";
        } else {
            // pseudo dispo
            // var_dump($_FILES);
            
            // Inscription en BDD
            $resultat = $pdo->prepare("INSERT INTO membre 
                                       VALUES(NULL, :pseudo, :mdp, :civilite,
                                                    :ville, :date_de_naissance, ".time().", :avatar)");
            $resultat->execute(array(
                "pseudo" => htmlspecialchars( $_POST["pseudo"]),
                "mdp" => password_hash($_POST["mdp"], PASSWORD_DEFAULT),
                "civilite" => $_POST["civilite"],
                "ville" => htmlspecialchars($_POST["ville"]),
                "date_de_naissance" => $_POST["date_de_naissance"],
                "avatar" => $avatar

            ));
            // Interrompt le script si l'insertion échoue : exemple : login trop long
            if (!empty($resultat->errorInfo()[2])){
                die("Erreur rencontrée - contacter l'administrateur");
            }
            $id_membre = $pdo->lastInsertId();
            $_SESSION["id_membre"] = $id_membre;
            $_SESSION["pseudo"] = htmlspecialchars( $_POST["pseudo"]);
            header("location:".URL);
            exit();
        }
        
        
    }

}


require_once("header.php");


// ICI C'est la page
if (!empty($msg)) {
    ?>
    <div class="alert alert-danger mt-4"><?= implode('<br>',$msg) ?></div>
    <?php
}

?>

<div class="row">
    <div class="col d-flex flex-column justify-content center align-items-center pt-2 pb-3">
       <form action="" method="post" enctype="multipart/form-data" class="mx-4 my-4">
            <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="pseudo">Pseudo</label>
                        <input type="text" name="pseudo" id="pseudo"
                        class="form-control" value="<?= $_POST["pseudo"] ?? "" ?>">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="mdp">MdP</label>
                        <input type="password" name="mdp" id="mdp"
                        class="form-control <?= (!empty($_POST) && empty($_POST['mdp']))?'border-danger':'' ?>">
                    </div>
                </div>
            

                <div class="form-group">
                    <div>
                        <label id="depotavatar" for="avatar" 
                            class="d-block bg-primary py-2 text-center rounded text-light">
                            Avatar<br>Cliquer ou déposer ici<br>
                            (jpg, png ou gif - max : 1200x1200)
                        </label>
                        <input type="file" id="avatar" name="avatar" class="d-none"
                            accept="image/png,image/gif,image/jpeg">
                        <input type="text" id="memoavatar" name="memoavatar" 
                                value="<?= $avatar ?? '' ?>" class="d-none">
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label>Genre</label>
                            <select name="civilite" class="form-control">
                                <option value="f" selected>Femme</option>
                                <option value="m" <?= (isset($_POST['civilite']) && $_POST['civilite']=='m') ? 'selected':'' ?>>Homme</option>
                            </select>
                        </div>
                    

                        <div class="form-group col-md-4">
                                    <label for="ville">Ville</label>
                                    <input type="text" id="ville" name="ville" class="form-control <?= (!empty($_POST) && empty($_POST['ville']))?'border-danger':'' ?>" value="<?= $_POST['ville'] ?? '' ?>">
                            
                        </div>

                        <div class="form-group col-md-4">
                            <label for="date_de_naissance">Date de naissance</label>
                            <input type="date" id="date_de_naissance" name="date_de_naissance" class="form-control <?= (!empty($_POST) && empty($_POST['date_de_naissance']))?'border-danger':'' ?>" value="<?= $_POST['date_de_naissance'] ?? '' ?>">
                        </div>
                    </div>
            </div>
                <input type="submit" value="Inscription" class="btn btn-primary d-block mx-auto w-100">

        </form>
        <p>
        J'ai déjà un compte, LOL, <a href="<?= URL . "connexion.php" ?>">je me connecte</a>.
        </p>
    </div>
</div>

<?php
require_once('footer.php');

?>