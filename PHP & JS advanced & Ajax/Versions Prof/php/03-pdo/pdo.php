<?php
// PHP Database Object
// Connexion BDD

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
var_dump($pdo);
var_dump(get_class_methods($pdo));
/*
exec('INSERT INTO ...')   => Nombre de lignes affectées
query('SELECT * FROM ...') => Objet de PDOStatement
prepare('SELECT *') => Objet de PDOStatement qui devra lancer l'execute()
lastInsertId() => après une insertion, renvoie le dernier id inséré
*/

/* Exemple d'insertion
$pdo->query("INSERT INTO employes VALUES (NULL, 'toto','toto','toto@free.fr')");
echo "Le nouvel employé a reçu l' id " . $pdo->lastInsertId();
*/ 

// prepare / execute
// marqueur anonyme
$result = $pdo->prepare("DELETE FROM employes WHERE id_employes = ?");
var_dump($result);
$result->execute(array(4));

$result = $pdo->prepare("SELECT * FROM employes WHERE nom=? AND prenom=?");
$result->execute(array('Durand','Jeanne'));

// marqueur nommé
$result = $pdo->prepare("SELECT * FROM employes WHERE nom=:nom AND prenom=:prenom");
$result->execute(array(
    'prenom' => 'Jeanne',
    'nom' => 'Durand'
    ));


$result = $pdo->query("SELECT * FROM employes");
// comptage
echo $result->rowCount() . ' enregistrements<br>';

if ( $result->rowCount() > 0 ){
    while($employe = $result->fetch()){
       var_dump($employe) ;
    }
}
else{
    echo 'Aucun employé enregistré<br>';
}
// avec  fetchAll
$result = $pdo->query("SELECT * FROM employes");
$donnees = $result->fetchAll();
echo "<hr>";
var_dump($donnees);

for($i=0; $i<count($donnees);$i++){
    foreach($donnees[$i] as $index => $value){
        echo $index . ' ' . $value . '<br>';
    }
    echo "<hr>";
}


$resultat = $pdo->prepare('SELECT * FROM employes WHERE id_employes=:id_employes');
$resultat->execute(array(
    'id_employes' => 1
));
$monEmploye = $resultat->fetch(PDO::FETCH_OBJ);
var_dump($monEmploye);
echo $monEmploye->prenom . '<br>';

/*
$_FILES fonctionne avec les formulaires qui ont des pieces jointes
        "<form action="" method="post" enctype="multipart/form-data">
        
        </form>

*/
// implode et explode
$date="2019-11-26";
$tab = explode('-',$date);
var_dump($tab);
list($annee,$mois,$jour) = explode('-',$date);
echo "annee : $annee, mois : $mois, jour : $jour<br>";
// explode chaine => tableau

$tab = array('Spider Man','Iron Man','Thor');
$chaine = implode(', ',$tab);
echo $chaine . '<br>';
// implode tableau => chaine



