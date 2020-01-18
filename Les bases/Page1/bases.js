// Ceci est un commentaire sur une ligne
/*
Ceci est un commentaire
sur plusieurs lignes
*/

// JS est un langage objet :
// On va utiliser les méthodes des objets document et console

// Documentation JS 
//  https://developer.mozilla.org/fr/docs/Web/JavaScript/

// Le Css est appliqué aux éléments créés par JS !
document.write('<h1>Bases Javascript</h1>');

// La console permet d'afficher les éléments, par exemple pour les points d'arrêts
console.log('Attention aux erreurs de syntaxe');
// Info fait quasi la même chose, sur firefox => fait apparaître un i dans la console
console.info('une information');

/* Les variables */
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

/* Typage des variables + Test */
document.write("<h2>Types de données</h2>");

let chiffre = 20; // number
let negatif = -10; // number
let monTexte = "Voici un texte"; // string
let numero = "10"; // string
let choix = true; // boolean

document.write(typeof (chiffre) + "<br>"); // duplication de code : alt shift down-arrow
document.write(typeof (negatif) + "<br>");
document.write(typeof (monTexte) + "<br>");
document.write(typeof (numero) + "<br>");
document.write(typeof (choix) + "<br>");
document.write(typeof (var3) + "<br>"); // pas déclarée => undefined
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
document.write("<br>le nom est : " + nom + " et le prenom : " + prenom + "<br>");

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
chiffre1++;
document.write(chiffre1 + "<br>");

/* La classe MATH */
// On peut utiliser l'objet de la classe Math = PROTOTYPES
document.write("<h2>La classe Math</h2>");
// Random : génère un nombre entre 0 et 1 non inclus
document.write(Math.random() + "<br>");
let chiffre2 = 5.6;
// Arrondi à l'entier le plus proche
document.write(Math.round(chiffre2) + "<br>");
// Force à l'entier inférieur
document.write(Math.floor(chiffre2) + "<br>");
// Force à l'entier supérieur
document.write(Math.ceil(chiffre2) + "<br>");

// exercice : simuler un jet de dé 6 :
document.write("<h3>Baldur's Gate 12 - Simulation Jet de dé(xtérité) 6</h3>");

for (let i = 0; i < 10; i++) {
    let jet = Math.ceil(Math.random() * 6);
    document.write(jet + "<br>");
}

// Autres fonctions Math : 
// Math.PI ; Math.sqrt() ; Math.pow(3, 4) ; Math.min(1, 2, 48, 9) ; Mat.max (1, 2, 600, 90)
// Math.trunc(6.25)
document.write("BOOM BOOM Math.pow :" + Math.pow(3, 4));

/* Les structures conditionnelles */
document.write("<h2>Structures conditionnelles</h2>");

let a = 10, b = 5, c = 2;

if (a > b) { // Condition booléenne
    document.write("a est supérieur à b<br>");
} else {
    document.write("a n'est pas supérieur à b<br>");
}
// ET
if (a > b && b > c) {
    document.write("Les deux conditions sont vraies<br>");
} else {
    document.write("Une des deux conditions est fausse<br>");
}

// OU
if (a == 9 || b > c) {
    document.write("Une des deux conditions est vraie<br>");
} else {
    document.write("Les deux conditions sont fausses<br>");
}

// OU Exclusif
if (a > b ^ b > c) {
    document.write("Les conditions sont vraies si seulement une seule est vraie<br>");
}
else {
    document.write("Les deux conditions sont vraies ou fausses<br>");
}

// structure if / else if / else
if (a == 8) {
    document.write("a vaut 8<br>");
} else if (a != 10) {
    document.write("a est différent de 10<br>");
} else {
    document.write('Cas final : a ne vaut pas 8 et égal à 10<br>');
}

// Négation de booléen et utilisation
let test = 3 < 1;
if (!test) {
    document.write("On est rentré dans le bloc sans faire toc toc toc<br>");
    document.write("test est FAUX<br>");
}

let varA = 1, varB = '1';
if (varA == varB) {
    document.write("varA et varB sont égales en valeur<br>");
}
if (varA === varB) {
    document.write("varA et varB sont égales en valeur et en type<br>");
} else {
    document.write("varA et varB n'ont pas le même type<br>");
}

/* Rappel ""=""
= affectation
== comparaison en valeur
=== comparaison en valeur et type
!= différence en valeur
!== différence en valeur et en type
*/

let varC = "chaine";
// isNaN = is Not a Number -- teste le contenu de la valeur
if (!isNaN(varC)) { // On teste si B est un nombre
    document.write("varC est un nombre<br>");
} else {
    document.write("varC n'est pas un nombre<br>");
}

// Construction ternaire
let sexe = "f";
document.write((sexe == "m") ? "Monsieur" : "Madame"); // Ecriture par l'opérateur ternaire
document.write("<br>");
let civilite = ((sexe == "m") ? "Monsieur" : "Madame"); // Affectation par l'opérateur ternaire

// Condition switch
let couleur = "jaune";
switch (couleur) { // On évalue la même valeur pour chaque cas
    case "bleu":
        document.write("Vous aimez le bleu !");
        break;
    case "rouge":
        document.write("Vous aimez le rouge");
        break;
    case "mion":
        document.write("Vous aimez les camions");
        break;
    case "vert":
    default:
        document.write("Vous n'aimez ni le bleu ni le rouge ni les camions");
        break;
}
document.write("<br>");


/* Les structures itératives */
document.write("<h2>Les structures itératives : les boucles</h2>");
document.write("Boucle WHILE tordue<br>");
// Boucle WHILE :
let i = 0; // Situation de départ
while (i <= 5) { // condition qui fait tourner la boucle
    document.write("<h" + i + ">" + "Test " + i + "</h" + i + ">");
    i++; // pas d'incrémentation
}

// Boucle FOR
document.write("Boucle FOR <br>");
// Boucle for :
for (let j = 0; j <= 5; j++) {
    document.write(j + "<br>");
}

// Exemple d'utilisation de WHILE
document.write("Boucle While avec input utilisateur <br>");
couleur = false;
while (couleur) { // Teste si couleur existe
    if (couleur != "stop") {
        document.write(couleur + "<br>");
        couleur = prompt("Saisir une couleur ou stop pour arrêter");
    } else {
        break;
    }
}

/* Les Fonction prédéfinies */
document.write("<h2>Les fonctions prédéfinies</h2>");

let phrase = "Bonjour, je m'appelle Quentin Môrtinèze";
document.write("Longueur de la variable 'phrase' : " + phrase.length + "<br>");
document.write("Quentin se trouve à la position " + phrase.indexOf("Quentin") + "<br>");
document.write(phrase.substr(22, 7) + "<br>"); // Paramètres: Pos départ, Longueur
document.write(phrase.substring(22, 29) + "<br>"); // // Paramètres: Pos départ, Pos arrivée

let email2 = 'f.dupont@free.fr';
// Pour extraire la partie avant @ :
document.write(email2.substring(0, email2.indexOf('@')) + "<br>");

email2 = 'pierre.matthieu@gmail.com'
// Pour extraire le nom de domaine :
document.write(email2.substr(email2.indexOf('@') + 1) + "<br>");

document.write(phrase.toLowerCase() + "<br>");
document.write(phrase.toUpperCase() + "<br>");


/* Les fonctions utilisateur */
document.write("<h2>Les fonctions utilisateurs</h2>");

// Méthode classique avec paramètre local
function maFonction(prenom2) {
    if (prenom2) {
        return "Tu sors " + prenom2 + " !!!!!!!!!!!!!!!!!!!!!!!!!<br>";
    } else {
        return "Tu sors !!!!!!<br>"
    }
}
// document.write(prenom2); // prenom2 n'existe pas dans ce scope
document.write(maFonction("Rémi"));
document.write(maFonction("Guy"));
document.write(maFonction());

// Exercice :
// Ecrire une fonction prixSolde() 
function prixSolde(total, remise) {
    if (total > 0 && remise > 0) {
        return total - (total * remise / 100) + "€<br>";
        // return total * (1 - remise / 100);
    } else {
        return -1;
    }
}

document.write(prixSolde(100, 20) + "<br>"); // 80€
document.write(prixSolde(1000, 8) + "<br>"); // 80€
document.write(prixSolde(1000, 0) + "<br>"); // 80€
document.write(prixSolde(9000, 98) + "<br>"); // 80€

// Méthode avec ES6
let maFonction2 = (a, b) => { return a + b; };
document.write(maFonction2(10, 3) + "<br>");

// espaces globaux - locaux

// Méthode pour éviter d'écrire document.write partout
// Exercice : Ajouter des <hr> si on a un <h2>
function dw(arg) {

    if ( isNaN(arg) && arg.includes("h2")) {
        return (document.write("<hr>" + arg));
    } else {
        return document.write(arg + "<br>");
    }
}

dw('<h2>Espace globaux & locaux</h2>')

let animal = 'Loup';
function jungle() {
    // Si on ne déclare pas de variable locale, animal utilise la variable globale précédente
    // Si on retire le let, on écrase la variable globale animal
    let animal = "Garou";
    return animal;
}

dw(animal);
dw(jungle());
dw(animal);

if (1 === 1) {
    let maVar1 = true;
}
// maVar1 n'existe qu'à l'intérieur du if
// console.log(maVar1); => Génère une erreur

if (1 === 1) {
    var maVar2 = true;
}
console.log(maVar2);

// Conclusion : let limite la portée de la variable au bloc dans lequel il se trouve, ici la structure IF();

/* Les tableaux */
dw('<h2>Les tableaux : array()</h2>');

// 2 Manières pour déclarer :
let fruits = Array("Pomme", "Fraise", "Poire");
let familles = ["Lannister", "Stark", "Targaryen"];

dw("Longueur de fruits : " + fruits.length); // Retourne le nombre d'éléments du tableau
dw(familles.join(" | ")); // Permet de convertir un tableau en chaîne avec un séparateur (default : ,)

console.log(familles);
dw("Tony " + familles[1]);

for (let k = 0; k < familles.length; k++) {
    dw(fruits[k] + " " + familles[k]);
}

// Pour parcourir un tableau ou un objet, en utilisant la notation tableau
for (let p in familles) {
    dw(p + " " + familles[p]);
}
// Similaire à la boucle foreach du c#, sans se préoccuper de l'index
for (let p of familles.reverse()) {
    dw(p);
}

/* Les objets */
dw("<h2>Les objets</h2>");

// 2 manières pour déclarer :
let objet1 = {}; // Object Litteral Notation => JavaScript Object Notation = JSON

let objet2 = new Object(); // Instanciation d'un objet de la classe Object


// Manipulations d'objets contondants
objet1.nom = "Mamodaly";
objet1['prenom'] = "Moufazal";

dw(objet1.prenom + " " + objet1["nom"] + " DA JS MASTAH");

// Définition d'un objet à la volée
let maVoiture = {
    marque: 'bmw',
    modele: 's5',
    couleur: 'noire',
    demarrer: function () { return "Je démarre Vroum Vroum"; }
};
dw(maVoiture.couleur);
dw(maVoiture.demarrer());

// Pour parcourir les propriétés d'un objet
for (let k in maVoiture) {
    dw("<hr>" + k + " : " + maVoiture[k]);
}

// Pseudo-classe et this - AVANT ES6
function Animal(nom, espece, categorie, age) {
    this.nom = nom;
    this.espece = espece;
    this.categorie = categorie;
    this.age = age;
}

let dauphin = new Animal("Flipper", "Gnou", "Alumni", 323);
dw(dauphin.nom);

// Avec ES6 : on peut / doit déclarer une classe
class Animal2 {
    constructor(nom, espece, categorie, age) {
        this.nom = nom;
        this.espece = espece;
        this.categorie = categorie;
        this.age = age;
    }
}
// Pour l'instancier
let abribus = new Animal2("Gigi", "Magique", "Grorelou", 20);
dw(abribus.espece);

// On peut quand même rajouter une propriété à la volée
abribus.manger = "Crèpes";
dw(abribus.manger);

// On peut aussi déclarer des méthodes de ouf
class Animal3 {
    constructor(nom, espece, categorie, age) {
        this.nom = nom;
        this.espece = espece;
        this.categorie = categorie;
        this.age = age;
    }
    anniversaire() {
    
        return ++this.age;
    }
}

let mongolo = new Animal3("Mongolo", "Michto", "Bidule", 20);
dw(mongolo.anniversaire());


