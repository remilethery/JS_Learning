<?php
echo "<h1>PDO - Connexion à une base de données pour le CRUD</h1>";

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

echo "<hr>Objet PDO<br>";
var_dump($pdo);
var_dump(get_class_methods($pdo));

/*
Méthodes accueillant une méthode SQL
exec("INSERT INTO...") => Renvoie le nombre de ligne affectées
query("SELECT * FROM") => Renvoie un objet de type PDOStatement
prepare("SELECT * FROM ") => Renvoie un objet de type PDOStatement 
                    qui devra lancer l'execute()
                    privilégié pour les requêtes de formulaire
                    et éviter les attaques
lastInsertId()
*/


/* Exemple d'insertion => Méthode à ne pas utiliser
$pdo->query('INSERT INTO employes VALUES (NULL, "Vigo", "Hector", "vectorhugo@free.fr")');
echo "Le nouvel employé a reçu l'ID " . $pdo->lastInsertId();
*/

// prepare / execute => Méthode à privilégier
/* $result = $pdo->prepare("DELETE FROM employes WHERE id_employe = ?");
var_dump($result);
$result->execute(array(4)); */

// On limite les injections en SQL
$result2 = $pdo->prepare("SELECT * FROM employes WHERE nom=? AND prenom=?");
$result2->execute(array("Naruto", "Dark"));

// marqueur nommé
$result3 = $pdo->prepare("SELECT * FROM employes WHERE nom=:nom AND prenom=:prenom");
$result3->execute(array(
    "prenom" => "Jeanne",
    "nom" => "Durand"
));

// Exécution d'une query pour récupérer 
echo "<hr>Fetch et while<br>";
$result4 = $pdo->query("SELECT * FROM employes");
// Le nombre d'enregistrements
echo $result4->rowCount() . " Enregistrements de la clause WHERE<br>";
// Les valeurs avec la méthode fetch
if ( $result4->rowCount()>0) {
    while ($employe = $result4->fetch()){
        var_dump($employe);
    }
} else {
    echo "Aucun employé enregistré lol";
}

//Avec fetchALL
echo "<hr>Fetch ALL<br>";
$result5 = $pdo->query("SELECT * FROM employes");
$donnees = $result5->fetchAll();

var_dump($donnees);

echo "<h4>Parcours du fetchAll avec une boucle for externe + parcours des données avec foreach</h4>";
for ($i = 0 ; $i < count($donnees) ; $i++) {
    foreach ($donnees[$i] as $key => $value) {
        echo $key . " " . $value . "<br>";
    }
}

echo "<hr>Utilisation de FETCHOBJ<br>";
$result6 = $pdo->prepare("SELECT * FROM employes WHERE id_employe=:id_employe");
$result6->execute(array(
    "id_employe" => 3
));
// On utilisait la méthode FETCH_ASSOC, ici on utilise FETCH_OBJ
$monEmploye = $result6->fetch(PDO::FETCH_OBJ);
var_dump($monEmploye);
echo $monEmploye->prenom . "<br>";

/*
Superglobale $_FILES fonctionne avec les formulaires qui ont des pièces jointes
        suppose la présence de enctype : 
                "<form action="" method="post" enctype="multipart/form-data">
                        </form>"
*/
echo "<br>Méthodes implode et explode :<br>";
// implode et explode :
echo "---- explode : chaîne vers tableau ----<br>";
$date = "2019-11-26";
$tab = explode("-", $date);
var_dump($tab);

list ($annee, $mois, $jour) = explode ("-", $date);
echo "annee : $annee, mois : $mois, jour : $jour<br>";

echo "---- implode : tableau vers chaîne ----<br>";
$tab = array("Spiderman", "Ironman", "Thor");
$chaine = implode (",", $tab);
echo $chaine . "<br>";

?>