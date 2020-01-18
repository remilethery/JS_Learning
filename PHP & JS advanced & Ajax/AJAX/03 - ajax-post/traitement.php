<?php

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

// Récupéré de la variable recherche de functions.js
$recherche = $_POST["recherche"];

// On utilise la fonction concat de mySQL pour interpréter la variable :
$result = $pdo->prepare("SELECT * FROM employes WHERE nom LIKE CONCAT('%',:recherche,'%') 
                    OR prenom LIKE CONCAT('%',:recherche,'%')
                    OR email LIKE CONCAT('%',:recherche,'%')
                    LIMIT 0, 10");

$result->execute(array(
    "recherche" => $recherche
));

if ($result->rowCount() > 0) {
    $tab["resultats"] = "<ul>";
    $donnees = $result->fetchAll();
    for ($i=0; $i < count($donnees); $i++) { 
        $tab["resultats"] .=
            "<li>" . $donnees[$i]["nom"]
            . " " . $donnees[$i]["prenom"]
            . " (" . $donnees[$i]["email"]
            . ")</li>";
             
    }
    $tab["resultats"] .= "</ul>";
} else {
    $tab["resultats"] = "Aucun pelo trouvé";
}

echo json_encode($tab);

?>