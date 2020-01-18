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

    case 'liste':
        $result = $pdo->query("SELECT * FROM employes");
        $tab['liste'] = '<table>
        <tr>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Email</th>
        </tr>';
        while($employe = $result->fetch() ){
            $tab['liste'] .= '<tr>
                <td>'.$employe['nom'].'</td>
                <td>'.$employe['prenom'].'</td>
                <td>'.$employe['email'].'</td>
                <td><span cible="'.$employe['id_employes'].'">&#128465;</span></td>
            </tr>';
        }
        $tab['liste'] .= '</table>';
    break;
    case 'ajout':
        extract($_POST);
        // créé autant de variables qu'il y a d'index
        $result = $pdo->prepare("INSERT INTO employes VALUES (NULL,:nom,:prenom,:email)");
        $result->execute( array(
            'nom' => $nom,
            'prenom' => $prenom,
            'email' => $email
        ));
        $tab['dernierID'] = $pdo->lastInsertId();
    break;
    case 'del':
        $cible = $_POST['cible'];
        $result = $pdo->prepare("DELETE FROM employes WHERE id_employes=:cible");
        $result->execute(array(
            'cible' => $cible
        ));
    break;
};

echo json_encode($tab);