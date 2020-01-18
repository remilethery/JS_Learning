<?php

require_once('inc/init.php');
// page profil
if( !isset($_SESSION['pseudo']) ){
    header('location:'. URL . 'connexion.php');
    exit();
}

require_once('header.php');
$resultat = $pdo->prepare("SELECT * FROM membre WHERE id_membre=:id_membre");
$resultat->execute(array('id_membre' => $_SESSION['id_membre']));
$mesinfos = $resultat->fetch();
$avatar = $mesinfos['avatar'] ?? '';

if (!empty($_POST)){
   
    $avatar = $_POST['memoavatar'] ?? '';

     if (!empty($_FILES['avatar']['name'])) {
        $sup = $_SERVER['DOCUMENT_ROOT'] . URL . 'avatars/' . $mesinfos['avatar'];
        if( file_exists($sup) ){
            unlink($sup);
        }
        $avatar = $_SESSION['pseudo'] . '_' . $_FILES['avatar']['name'];
        // Mohamed represents
        $chemin = $_SERVER['DOCUMENT_ROOT'] . URL . 'avatars/';
        move_uploaded_file($_FILES['avatar']['tmp_name'], $chemin . $avatar);
    }
    $resultat = $pdo->prepare("UPDATE membre SET
    avatar = :avatar,
    ville = :ville,
    civilite = :civilite,
    date_de_naissance = :date_de_naissance
    WHERE id_membre = :id_membre");
    $resultat->execute(array(
        'avatar' => $avatar,
        'ville' => $_POST['ville'],
        'civilite' => $_POST['civilite'],
        'date_de_naissance' => $_POST['date_de_naissance'],
        'id_membre' => $_SESSION['id_membre']
    ));
    if (!empty($resultat->errorInfo()[2])) {
        die('Erreur rencontrée - contacter l\'administrateur');
    }
    echo '<div class="alert alert-success">Modifications effectuées</div>';
}
?>
<div class="row">
    <div class="col d-flex flex-column justify-content center align-items-center pt-2 pb-3">
        <form action="" method="post" enctype="multipart/form-data" class="mx-4 my-4">
            <div class="form-group">
                <label id="depotavatar" for="avatar" class="d-block bg-primary py-4 text-center rounded text-light">
                    <?=
                    ($avatar != '') ? '<img src="avatars/'.$mesinfos['avatar'].'" alt="" class="img-fluid w-25">' : 'Avatar<br>Cliquer ou déposer ici<br>(jpg,png ou gif - max : 1200x1200)';
                    ?>                    
                </label>
                <input type="file" id="avatar" name="avatar" class="d-none" accept="image/png,image/jpeg,image/gif">
                
                <input type="text" id="memoavatar" name="memoavatar" value="<?= $avatar ?? '' ?>" class="d-none">

            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label>Genre</label>
                    <select name="civilite" class="form-control">
                        <option value="f" selected>Femme</option>
                        <option value="m" <?= ( (isset($_POST['civilite']) && $_POST['civilite'] == 'm' ) || ($mesinfos['civilite'] == 'm' && !isset($_POST['civilite']) )   ) ? 'selected' : '' ?>>Homme</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="ville">Ville</label>
                    <input type="text" id="ville" name="ville" class="form-control <?= (!empty($_POST) && empty($_POST['ville'])) ? 'border-danger' : '' ?>" value="<?= $_POST['ville'] ?? $mesinfos['ville'] ?? '' ?>">
                </div>
                <div class="form-group col-md-4">
                    <label for="date_de_naissance">Date de Naissance</label>
                    <input type="date" id="date_de_naissance" name="date_de_naissance" class="form-control <?= (!empty($_POST) && empty($_POST['date_de_naissance'])) ? 'border-danger' : '' ?>" 
                    value="<?= $_POST['date_de_naissance'] ?? $mesinfos['date_de_naissance'] ?? '' ?>">
                </div>
            </div>
            <input type="submit" value="Modifier" class="btn btn-primary d-block mx-auto w-100">
        </form>
    </div>
</div>



<a href="<?= URL ?>" class="btn btn-primary">Retour au tchat</a>
<?php


require_once('footer.php');