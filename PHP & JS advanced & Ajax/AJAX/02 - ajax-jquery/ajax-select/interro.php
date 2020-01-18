<?php
// Connexion BDD

$pdo = new PDO( // PHP DATABASE OBJECT
    "mysql:host=localhost;dbname=entreprise",
    "root",
    "",
    array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, // ERRMODE_SILENT en prod
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    )
);

// On récupère la valeur de id employé par la super globale array $_POST
$id_employe = $_POST["id_employe"];

$result = $pdo->prepare("SELECT * FROM employes where id_employe=:id");
$result->execute(array(
    "id" => $id_employe
));

$employe = $result-> fetch();

$tab["resultats"] = $employe["prenom"]. " " . $employe["nom"] . " " . $employe["email"];

echo json_encode($tab);


?>
