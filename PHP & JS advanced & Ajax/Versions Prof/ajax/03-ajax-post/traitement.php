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

$recherche = $_POST['recherche'];

$result = $pdo->prepare("SELECT * FROM employes WHERE
nom LIKE CONCAT('%',:recherche,'%') OR
prenom LIKE CONCAT('%',:recherche,'%') OR
email LIKE CONCAT('%',:recherche,'%') LIMIT 0,10");

$result->execute(array(
    'recherche' => $recherche
));
if($result->rowCount() > 0){
    $tab['resultats'] = '<ul>';
    $donnees = $result->fetchAll();
    for($i=0; $i < count($donnees);$i++){
        $tab['resultats'] .= '<li>'.$donnees[$i]['nom'].' '.$donnees[$i]['prenom'].'('.$donnees[$i]['email'].')</li>';
    }
    $tab['resultats'] .= '</ul>';
}else{
    $tab['resultats'] = 'Aucun employé trouvé';
}

echo json_encode($tab);