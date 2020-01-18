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

$action = $_POST['action'];
$tab = array();

switch($action){

    case "liste":
        $result = $pdo->query("SELECT * FROM employes");
        $tab["liste"] = "<table>
        <tr>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Email</th>
        <th>Suppression</th>
        </tr>";
        while ($employe = $result->fetch()) {
            $tab["liste"] .= 
                "<tr> 
                <td>" . $employe["nom"]  . "</td>
                <td>" . $employe["prenom"]  . "</td>
                <td>" . $employe["email"]  . "</td>
                <td>" . "<span cible='". $employe["id_employe"]. "'>&#128465;</span>". "</td>
                </tr>";
        }
        $tab["liste"] .= "</table>";
        break;
    case "ajout":
        // Crée autant de variables qu'il y a de -keys-
        extract($_POST);
        $result = $pdo->prepare("INSERT INTO employes VALUES (NULL,:nom,:prenom,:email)");
        $result->execute( array(
            "nom" => $nom,
            "prenom" => $prenom,
            "email" => $email
        ));
        $tab["dernierID"] = $pdo->lastInsertId();
        break;
    case "suppr":
        $cible = $_POST["cible"];
        $result = $pdo->prepare("DELETE FROM employes WHERE id_employe=:cible");
        $result->execute(array(
            "cible" => $cible
        ));
        break;
};

echo json_encode($tab);

?>