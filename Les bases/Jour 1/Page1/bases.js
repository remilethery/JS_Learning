// Ceci est un commentaire sur une ligne
/*
Ceci est un commentaire
sur plusieurs lignes
*/

// JS est un langage objet :
// On va utiliser les méthodes des objets document et console

// Le Css est appliqué aux éléments créés par JS !
document.write('<h1>Bases Javascript</h1>');

// La console permet d'afficher les éléments, par exemple pour les points d'arrêts
console.log('Attention aux erreurs de syntaxe');
// Info fait quasi la même chose, sur firefox => fait apparaître un i dans la console
console.info('une information');

// Déclaration des variables
document.write('<h2>Variables : déclaration & affectations</h2>');

// Plusieurs façons :
maBoite = 5; // brut
var maBoite2 = 10; // depuis JS1
let maBoite3 = 15; // depuis JS6

// Utilisation en concaténation
document.write('Ma boite 3 contient ' + maBoite3);

// Déclaration de variable en chaîne et affectation en chaîne
// let nom, prenom;
let nom = "Duran", prenom = "Sylvie";
// Nom déjà déclaré => let nom = "toto"; génère une erreur
// On doit utiliser une réaffectation
// !! let effectue aussi une réservation de nom !!
nom = "Toto";
console.log(nom);
// Avec var : pas de réservation de nom contrairement à let
var email = "toto@yahoo.fr";
var email = "titi@yahoo.fr";
console.log(email);

let fruit = "fraise";
fruit += "pomme"; // Concaténation des chaînes de caractères
console.log(fruit); // Si au moins l'une des variables est une chaînes => concaténation
// + produit une addition si au tous les éléménts sont de type number

// Typage des variables + Test
document.write("<h2>Types de données</h2>");

let chiffre = 20; // number
let negatif = -10; // number
let monTexte = "Voici un texte"; // string
let numero = "10"; // string
let choix = true; // boolean

document.write(typeof(chiffre) + "<br>"); // duplication de code : alt shift down-arrow
document.write(typeof(negatif) + "<br>");
document.write(typeof(monTexte) + "<br>");
document.write(typeof(numero) + "<br>");
document.write(typeof(choix) + "<br>");
document.write(typeof(var3) + "<br>"); // pas déclarée => undefined
// document.write(var3 + "<br>"); => Génère une erreur de compil : var3 pas déclarée
// let var3; // Si on met var : pas de message d'erreur
// document.write(var3 + "<br>"); // => Génère également une erreur : var3 pas initialisée

document.write("<h2>Constantes</h2>");

const BOUGE_PAS = "ma constante : impossible à modifier"; // convention : constantes en MAJ
document.write(BOUGE_PAS);
// const BOUGE_PAS = "autre valeur"; // Redéclaration impossible => Génère une erreur
// let BOUGE_PAS = "autre valeur"; // Redéfinition de constante => Génère une erreur
// const n'est pas toujours reconnu avant ES 6, on utilisait var ou let + MAJ pour dire que c'est une constante


/* Les opérateurs */
// Concaténation - rappel :
document.write("<br>le nom est : " + nom + "et le prenom : " + prenom + "<br>");

document.write("<h2>Les opérateurs arithmétiques</h2>");
let resultat = 120 + 55;
document.write(resultat + "<br>");
resultat = 120 - 55;
document.write(resultat + "<br>");
resultat = 120 * 55;
document.write(resultat + "<br>");
resultat = 120 / 55;
document.write(resultat + "<br>");
resultat = 120 % 55; // Modulo
document.write(resultat + "<br>");

let chiffre1 = 10;
chiffre1 += 5;
chiffre1 ++;
document.write(chiffre1 + "<br>");

// On peut utiliser l'objet de la classe Math = PROTOTYPES
document.write("<h2>La classe Math</h2>");
// Random : génère un nombre entre 0 et <1
document.write(Math.random() + "<br>");
let chiffre2 = 5.6;
document.write(Math.round(chiffre2) + "<br>");
document.write(Math.floor(chiffre2) + "<br>");
document.write(Math.ceil(chiffre2) + "<br>");

