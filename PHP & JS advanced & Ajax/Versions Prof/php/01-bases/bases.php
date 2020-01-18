<?php

// ceci est un commentaire sur une ligne
/*
commentaire
sur plusieurs lignes
*/
echo 'Hello world';
?>
<h1>Bases PHP</h1>
<?php

// les variables
$a = 12;
$b = false;
$c = 'texte';
echo gettype($a);
echo "<br>";
echo gettype($b);
echo "<br>";
echo 'j\'écris du' . $c . '<br>';
// quote et guillemet
$var = 'Paris';
echo 'la capitale est $var <br>';
echo "la capitale est $var <br>";
echo 'la capitale est ' . $var . ' <br>';

// Constantes
// define(nom,valeur);
define('URL','http://monsite.com/');
echo  URL . '<br>';
define('MDP','secret');

// constantes magiques
echo __DIR__ . '<br>'; // directory courant
echo __FILE__ . '<br>'; // fichier courant
echo __LINE__ . '<br>'; // ligne courante

// opérations
$a += 5; // $a = $a + 5;
$a++;
$a--;

echo "<h2>Structures conditionnelles</h2>";
$a=10;
$b=5;
$c=2;
if($a > $b){
    echo "a est supérieur à b<br>";
}
if($a>$b && $b > $c){
    echo "ok pour les 2 conditions<br>";
}
/*
|| ou inclusif
XOR ou exclusif ( js ^ )
! NOT
!= différent de
== comparaison en valeur
=== comparaison en valeur et en type
*/
$sexe = 'm';
echo ($sexe == 'm') ? 'Monsieur' : 'Madame';
echo "<hr>";
// empty() et isset()
$var1 = 0;
$var2 = '';
if( empty($var2)){
    echo "0, vide ou n'existe pas<br>";
}
if( isset($var2)){
    echo 'var2 existe<br>';
}
// forme ternaire PHP7
$var3 = 'mavar';
if ( isset($var3) ){ echo $var3; } else { echo 'valeur par défaut'; }

echo $var3 ?? 'valeur par défaut';
// test implicite isset($var3) est vrai

echo $pays ?? $region ?? $ville ?? 'non défini';
// Condition switch identique JS
?>
<div><?= $var3 ?></div>
<?php
// <?= identique à <?php echo
// fonctions prédéfinies
echo "<h2>Fonctions prédéfinies</h2>";
// date
echo date('l d/m/Y H:i:s');
echo '<br>';
echo date('l d/m/Y H:i:s',strtotime('1912-04-14 22:30:00'));
echo "<br>";
echo mktime(22,30,00,04,14,1912);
// strtotime() et mktime() fabriquent des timestamp

//  fonctions sur les chaines de caractères
echo "<hr>";
$email = 'f.durand@free.fr';
echo iconv_strlen($email) . ' caractères<br>';
echo substr($email,0,8) . '<br>';
// subtr(debut, longueur)
echo substr($email,9) . '<br>';
echo strpos($email,'@'). '<br>';
// code générique
$email = 'christine.dupond@gmail.com';
$nom = substr($email,0,strpos($email,'@'));
$provider = substr($email,strpos($email,'@')+1);
echo $nom . ',' . $provider;

echo "<h2>Fonctions utilisateur</h2>";
function maFonction(string $prenom='tout le monde'):string
{
    return 'Bonjour '.$prenom.' <br>'   ;    
}
echo maFonction('Hugues');
echo maFonction();
// en mettant une valeur par défaut à un paramètre, il devient facultatif
// depuis php 7, on peut typer les parametres d'une fonction, et typer le retour de la fonction
echo time(); // renvoie le timestamp courant
function toutFacultatif(){
    var_dump( func_get_args() );
    // func_get_args() récupère les paramètres dans un tableau (array)
}
toutFacultatif('Paris',12,false,'toto');

/*
Structures itératives
FOR
WHILE
identiques JS
*/
echo "<h2>Les tableaux Array</h2>";
$montab = array('fraise','pomme','banane');
var_dump($montab);

$tab2 = array(
    'c' => 'carotte',
    't' => 'tomate',
    'p' => 'poivron'
 );
 var_dump($tab2);
echo $montab[1] . '<br>'; // pomme
echo $tab2['p'] . '<br>'; // poivron

echo "<hr>";
// FOR pour tableau à index numériques
for($i=0; $i < count($montab);$i++){
    echo $montab[$i] . '<br>';
}

// FOREACH  pour tableau à index alphabetiques
foreach( $tab2 as $index => $valeur){
    echo $index.' '.$valeur.'<br>';
}
// avec cette notation on recupere la valeur
foreach( $tab2 as $valeur){
    echo $valeur.'<br>';
}

$beatles = array('John Lennon');
$beatles[] = 'Paul McCartney';
$beatles[] = 'George Harrisson';
$beatles[] = 'Ringo Starr';
var_dump($beatles);

echo "<h2>Inclusion de fichiers</h2>";

// 1ere methode
echo '1ere fois : ';
include('fichier_inclus.txt');
echo "<br>";
echo '2eme fois : ';
include_once('fichier_inclus.txt');
echo "<br>";
echo '3eme fois : ';
require('fichier_inclus.txt');
echo "<br>";
echo '4eme fois : ';
require_once('fichier_inclus.txt');
echo "<br>";

echo "<h2>Les Objets</h2>";

date_default_timezone_set('Europe/Paris');
$madate = new DateTime();
var_dump($madate);
var_dump(get_class_methods($madate));
echo $madate->timezone . '<br>';
echo $madate->format('d/m/Y') . '<br>';

$madate2 = new DateTime('2000-12-01');

$age = $madate->diff($madate2);
echo $age->format('%y ans %m mois');

class Personne{
    public $prenom;
    public $nom;
    public function pays(){
        return 'France';
    }
}

$individu1 = new Personne;
$individu1->prenom = 'Jean';
$individu1->nom = 'Durand';
var_dump($individu1);
echo $individu1->pays();


$obj = new StdClass();
$obj->propriete = 'valeur';

$tab=array('nom' => 'Fred');
$obj2 = (object) $tab; // cast
var_dump($obj2);
$obj3 = json_encode($tab);
var_dump($obj3);

$liste =  ['element1','element2'];
$obj4 = json_encode($liste);
var_dump($obj4);
$obj4php = (object) $liste;
var_dump($obj4php);
echo $obj4php->{0};
// propriété numérique

echo "<br>";
$i=1;
$obj4php->prop1 = 16;
echo $obj4php->{'prop'.$i};
// nom de propriété construit avec une variable
echo "<br>";
$propriete = 'prop1';
echo $obj4php->$propriete;

















