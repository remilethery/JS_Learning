<?php

// Superglobale $_POST
var_dump($_POST);
?>
<form action="" method="post">
    <label for="login">Login</label>
    <input type="text" id="login" name="identifiant">
    <label for="mdp">Mot de passe<label>
    <input type="password" id="mdp" name="motdepasse">

    <input type="submit" value="Soumettre le formulaire">
</form>