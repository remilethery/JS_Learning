<h1>Bases PHP</h1>
<!-- Dans Wamp : Ajouter localhost dans les paramêtres -->

<?php
echo "<h2>Les variables</h2>";
$a = 12;
$b = false;
$c = "texte";

echo gettype($a);
echo($b);
echo gettype($c);

echo 'j\'ecris du'.$c;

$var = 'Paris';
echo 'La capitale est $var <br>';
echo "La capitale est: '.$var.'<br>";
echo "La capitale est: $var<br>"; //distingue les variable

// Constantes
// define (nom, valeur);
define("URL", "http://monsite.com");
echo URL . "<br>";
define("MDP", "secret");

// Constantes magiques
echo __DIR__ . "<br>";
echo __FILE__ . "<br>";
echo __LINE__ . "<br>";


// Opérations
$a += 5;
$a++;
$a--;

// Structures conditionnelles
echo "<h2>Structures conditionnelles</h2>";
$a = 10;
$b = 5;
$c = 2;
if ($a > $b) {
    echo "a est supérieur à b"."<br>";
}
if ($a > $b && $b > $c) {
   echo "Ok pour les 2 conditions"."<br>" ;
}

/* Opérateurs booléens
|| => OU inclusif comme en JS
XOR => OU exclusif (en JS : ^)
!=  => différent
== comparaison en valeur
=== comparaison en valeur et en type
*/

// Opérateur ternaire
$sexe = "m";
echo($sexe == "m") ? "Monsieur" : "Madame";
echo("<br>");

// empty() & isset()
// empty() renvoie vrai la variable testée est :
// = 0 ; est vide ; est null
$var1 = 0; // Attention, en php, 0 est vide
$var2 = "";
if (empty($var1) || empty($var2)){
    echo "Les deux variables sont considérées comme vide  par empty" . "<br>";
}
// isset() vérifie l'existence d'une variable
if (isset($var2)) {
    echo "var2 existe" . "<br>";
}

// Pour tester qu'un champ n'est pas vide :
$champ = "bla";
if ($champ != "") {
    echo $champ . "<br>";
}

// Forme ternaire PHP7 :
$var3 = "mavar";
if ( isset($var3) ) { 
    echo $var3;
} else {
    echo "valeur par défaut";
}
// Vérifie isset($var3)
echo $var3 ?? "valeur par défaut"; 


echo $pays?? $region ?? $ville ?? "non défini";

// Condition switch identique au JS

?>

<div><?= $var3 ?></div>
<?php
// <?= identique à <?php echo - (2 lignes avant)

// Fonctions prédéfinies
echo "<h2>Fonctions prédéfinies</h2>";
// Date
echo date("l d/m/Y H:i:s") . "<br>";

//strtotime() et mktime() fabriquent des timestamps
// Envoie un timestamp <--- strtotime(Date)
echo date("l d/m/Y H:i:s", strtotime("1912-04-14 22:30:00"));

// Pour créer un timestamp :
echo mktime(22, 30, 00, 04, 14, 1912);

// Fonction sur les chaînes de caractère
echo "<hr>";
$email = "f.durand@free.fr";
echo iconv_strlen($email). " caractères<br>";
//substr(debut, longueur)
echo substr($email, 0, 8) . "<br>";
echo strpos($email, "@") . "<br>";

// Code générique
$email = "christine.dupont@gmail.com";
$nom = substr($email, 0, strpos($email, "@"));
$provider = substr($email, strpos($email, "@") +  1);
echo $nom . " , " .$provider;

// Les fonctions utilisateur */
echo "<h2>Fonctions utilisateurs</h2>";

// Déclaration + retour
function maFonction(){
    return "Salut toi <br>";
}
// Utilisation du retour
echo maFonction();

function maFonction2($prenom){
    return "Salut " . $prenom . " !<br>";
}
echo maFonction2("Hugues");

// Variable facultative / paramètre par défaut
// Depuis php7, on peut typer les paramètres et le retour d'une fonction
function maFonction3(string $prenom="") : string 
{
    return "Bonjour " . $prenom . " !<br>";
}
echo maFonction3();
echo maFonction3("Gérard");

// Exemple de paramètre facultatif avec la fonction time()
echo time(); // renvoie le timestamp courant

// Exemple de fonction permettant de récupérer tous les paramètres
function toutFacultatif()
{
    var_dump( func_get_args() );
}
toutfacultatif("Paris", 322, false, "bibi");

/*
Structures itératives
FOR / WHILE identiques à JS
*/

echo "<h2>Les tableaux // Array</h2>";

$fruits = array("fraise", "pomme", "banane");
var_dump($fruits);

// En php on peut déclarer soi-même les index
$legumes = array(
    "c" => "carotte",
    "t" => "tomate",
    "p" => "poivron"
);
var_dump($legumes);

echo $fruits[1] . "<br>"; // pomme 
echo $legumes["p"] . "<br>"; // poivron

// boucle FOR pour un tableau à index numériques
echo "Boucle for :<br>";
for ($i=0; $i < count($fruits); $i++) { 
    echo $fruits[$i]. "<br>";
}

// boucle FOREACH pour un tableau à index alphanumériques
echo "Boucle foreach :<br>";
// $key et $value sont renommables
foreach ($legumes as $key => $value) { 
    echo $key . " " . $value . "<br>";
}
// On peut aussi juste utiliser value (dans ce cas pas php n'utilise pas l'index):
 foreach ($legumes as $value) { 
    echo $value . "<br>";
}

$beatles = array("John Lennon");
$beatles[] = "Paul McCartney";
$beatles[] = "George Harrison";
$beatles[] = "Ringo Starr";
var_dump($beatles);



/* Les inclusions de fichier */
echo "<h2>Inclusion de fichiers</h2>";

// 1ere méthode:
// include : inclut le fichier : si le fichier n'est pas trouvé, warning et continue
echo "1ere fois :<br>";
include("fichier_inclus.txt");
echo "<br>";
// include_once : regarge si le fichier a déjà été inclus => ici, ne l'affiche pas
echo "2eme fois :<br>";
include_once("fichier_inclus.txt");
echo "<br>";
// require : fichier nécessaire : si le fichier n'est pas trouvé, script arrêté
echo "3eme fois :<br>";
//require("fichier_inclus2.txt");
require("fichier_inclus.txt");
echo "<br>";
// require_once : fichier nécessaire, mais si déjà présent : pas réinclut
echo "4eme fois :<br>";
require_once("fichier_inclus.txt");
echo "<br>";



/* Les objets */
echo "<h2>Les Objets</h2>";

// Utilisation d'un objet déjà existant dans php
date_default_timezone_set("Europe/Paris");

$maDate = new DateTime();
var_dump($maDate); // Affiche les propriétés avec var_dump
var_dump(get_class_methods($maDate)); // Affiche les méthodes 

// Pour accéder aux pptés et aux méthodes, 
// on utilise ->, car . est déjà utilisé pour la concaténation
echo $maDate->timezone . "<br>";
echo $maDate->format("d/m/Y") . "<br>";

// Exemple pour calculer l'âge d'une personne :
$maDate2 = new DateTime("2000-01-01");
$age = $maDate->diff($maDate2);
echo $age->format("%y ans %m mois") . "<br>";


// Création de classes personnalisées
class Personne{
    public $prenom;
    public $nom;
    public function pays(){
        return "Fronce";
    }
}
// ... et instanciation
$individu1 = new Personne;
$individu1->prenom = "Jean";
$individu1->nom = "Dujardin";
var_dump($individu1);
echo $individu1->prenom . "<br>";
echo $individu1->pays() . "<br>";

// Fabrication d'un objet non rattaché à une classe
// Méthode 1
$obj1 = new StdClass();
$obj1->propriete = "valeur";
var_dump($obj1);
// Méthode 2
$tab=array("nom" => "Fred");
$obj2 = (object) $tab; // cast d'un tableau en objet
var_dump($obj2);
// Méthode 3 à partir d'un objet JSON
$obj3 = json_encode($tab);
var_dump($obj3);

$liste = ["element1", "element2"];
$obj4 = json_encode($liste);
var_dump($obj4);
$obj4php = (object) $liste;
var_dump($obj4php);
echo $obj4php->{0} . "<br>";
// Nom d'une propriété construit avec une variable
$i = 1;
$obj4php->prop1 = 16;
echo $obj4php->{"prop".$i};

echo "<br>";
$propriete = "prop1";
echo $obj4php->$propriete;






?>