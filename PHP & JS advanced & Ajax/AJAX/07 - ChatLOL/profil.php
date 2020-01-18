<?php

require_once("inc/init.php");

if ( !isset($_SESSION["id_membre"])) {
    header("location:" . URL);
    exit();
} else {

    // Recherche du membre et de toutes ses informations
    $id_membre = $_SESSION["id_membre"];
    $resultat = array();
    $resultat = $pdo->prepare("SELECT *
                               FROM membre
                               WHERE id_membre=:id_membre");
    $resultat->execute(array("id_membre" => $id_membre));
    $infosMembre = $resultat->fetch();
    // $infosMembre contient toutes les infos du membre
    // var_dump($infosMembre);
    // var_dump($infosMembre["civilite"]);
    // echo $_SESSION["id_membre"];
    

}

$msg = array();

// Vérif si session existe
if (!empty($_POST) && isset($_POST["postMDP"])) {
    //var_dump($_POST);
    // Check si les champs mots de passes sont remplis
    if ( !empty($_POST["previousPassword"]) 
            && !empty($_POST["newPassword"]) 
            && !empty($_POST["verifPassword"]) ) {
        // Vérif si les deux mots de passes sont égaux
            if ($_POST["newPassword"] == $_POST["verifPassword"]) {
                if (password_verify($_POST["previousPassword"],$infosMembre["password"])) 
                {
                    // Mise à jour du mot de passe
                    // 
                    $resultat = $pdo->prepare("UPDATE membre
                                               SET password=:mdp
                                               WHERE id_membre=:id_membre");

                    $resultat->execute(array(
                        "id_membre" => $id_membre,
                        "mdp" => password_hash($_POST["verifPassword"], PASSWORD_DEFAULT),
                    ));
                    if (!empty($resultat->errorInfo()[2])){
                        die("Erreur rencontrée - contacter l'administrateur");
                    }
                    $msg[] = "Mot de passe mis à jour";

                } else {
                    $msg[] = "Impossible de mettre à jour le MdP - Pb ancien MdP"; 
                }

                } else {
                    $msg[] = "Les nouveaux Mdp ne correspondent pas";
                }
        } else {
        $msg[] = "Impossible de mettre à jour le MdP - champs vides";
    }

}


if (!empty($_POST) && isset($_POST["postInfos"])) {
    var_dump($_POST);

    $avatar = $_POST['memoavatar'] ?? $infosMembre["avatar"];

    if (!empty($_FILES['avatar']['name'])) {
        $avatar = $_SESSION['pseudo'] . '_' . $_FILES['avatar']['name'];
        // Mohamed represents
        $chemin = $_SERVER['DOCUMENT_ROOT'] . URL . 'avatars/';
        move_uploaded_file($_FILES['avatar']['tmp_name'], $chemin . $avatar);
    } 

    if ( !empty($_POST["ville"]) && !empty($_POST["date_de_naissance"]) )
    {
        // Champs non vides
        // => Mise à jour des infos en BDD
                   
            $resultat = $pdo->prepare("UPDATE membre
                                       SET  civilite=:civilite,
                                            ville=:ville,
                                            date_de_naissance=:date_de_naissance,
                                            avatar=:avatar
                                         WHERE id_membre=:id_membre");

            $resultat->execute(array(
            "civilite" => $_POST["civilite"],
            "ville" => htmlspecialchars($_POST["ville"]),
            "date_de_naissance" => $_POST["date_de_naissance"],
            "avatar" => $avatar,
            "id_membre" => $id_membre
            ));

            // Interrompt le script si l'insertion échoue : exemple : login trop long
            if (!empty($resultat->errorInfo()[2])) {
                die("Erreur rencontrée - contacter l'administrateur");
            }
            $msg[] = "Informations modifiées";

    }
    else
    {
        $msg[] = "Informations manquantes - Mise à jour impossible.";
    }


}

require_once("header.php");

if (!empty($msg)) {
    ?>
    <div class="alert alert-danger mt-4"><?= implode('<br>',$msg) ?></div>
    <?php
}
?>


<!-- Ici la page -->

<h4 class="justify-content center mt4 align-items-center">Gestion du profil</h4>

<h5 class="mt-4 text-center">Connecté en tant que <?= $_SESSION["pseudo"] ?> </h5>


<div class="row">
    <div class="col d-flex flex-column justify-content center align-items-center pt-2 pb-3">
       <form action="" method="post" class="mx-4 my-4">

       <!-- Modification du Mot de Passe -->
            <div class="form-row">
                <div class="form-group col-md-12 justify-content-center align-items-center text-center">Mise à jour du mot de passe</div>
                <div class="form-group col-md-4">
                    <label for="pseudo">Ancien MdP</label>
                    <input type="password" name="previousPassword" id="previousPassword"
                    class="form-control" value="">
                </div>
                <div class="form-group col-md-4">
                    <label for="pseudo">Nouveau MdP</label>
                    <input type="password" name="newPassword" id="newPassword"
                    class="form-control" value="">
                </div>
                <div class="form-group col-md-4">
                    <label for="pseudo">Confirmation MdP</label>
                    <input type="password" name="verifPassword" id="verifPassword"
                    class="form-control" value="">
                </div>
            </div>
        <input type="submit" value="Mise à jour du MdP" 
               class="btn btn-primary d-block mx-auto w-100"
               name="postMDP">
        </form>
        <!-- multipart : uniquement si on a des input de type file dans les formulaires -->
        <form action="" method="post" enctype="multipart/form-data" class="mx-4 my-4">
        <!-- Modification de l'avatar -->
            <div class="form-group">
                    <div>
                        
                        
                        <label id="depotavatar" for="avatar" 
                            class="d-block bg-primary py-2 text-center rounded text-light">
                            Changer d'avatar<br>Cliquer ou déposer ici<br>
                            (jpg, png ou gif - max : 1200x1200)<br>
                            <img src="<?= "avatars/".$infosMembre["avatar"] ?>" class="img-fluid w-25">
                        </label>
                        <input type="file" id="avatar" name="avatar" class="d-none"
                            accept="image/png,image/gif,image/jpeg">
                        <input type="text" id="memoavatar" name="memoavatar" 
                                value="<?= $avatar ?? '' ?>" class="d-none">
                    </div>

        <!-- Modification de la civilité -->
        <!-- <?= (isset($_POST['civilite']) && $_POST['civilite']=='m') ? 'selected':'' ?> -->

            <div class="form-row">
                <div class="form-group col-md-4">
                    <label>Genre</label>
                    <select name="civilite" class="form-control">
                        <option value="f" <?= ($infosMembre["civilite"]== "f") ? "selected" : "" ?>>Femme</option>
                        <option value="m" <?= ($infosMembre["civilite"]== "m") ? "selected" : "" ?>>Homme</option>
                    </select>
                </div>
                    

            <div class="form-group col-md-4">
                        <label for="ville">Ville</label>
                        <input type="text" id="ville" name="ville" class="form-control"
                               value="<?= $_POST['ville'] ?? $infosMembre["ville"] ?>">
                
            </div>

                        <div class="form-group col-md-4">
                            <label for="date_de_naissance">Date de naissance</label>
                            <input type="date" id="date_de_naissance" name="date_de_naissance" class="form-control" 
                                   value="<?= $_POST['date_de_naissance'] ?? $infosMembre["date_de_naissance"] ?>">
                        </div>
                    </div>
            </div>
            <input type="submit" value="Mise à jour des infos" 
                   class="btn btn-primary d-block mx-auto w-100"
                   name="postInfos">

        </form>
        <p>Retour au <a href="<?= URL . "index.php" ?>">Chat Fullslack 😎</a>.
    </div>


<?php
require_once('footer.php');

?>