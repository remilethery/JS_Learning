<?php
$pdo = new PDO(
    'mysql:host=localhost;dbname=entreprise',
    'root',
    '',
    array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, // ERRMODE_SILENT
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    )
);

$id_employes = $_POST['id_employes'];

$result = $pdo->prepare("SELECT * FROM employes WHERE id_employes=:id");
$result->execute(array(
    'id' => $id_employes
));

$employe = $result->fetch();

$tab['resultats']= $employe['prenom'].' '.$employe['nom'].' '.$employe['email'];

echo json_encode($tab);

