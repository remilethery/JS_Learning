// Début du DOM Loaded
// Tout les scripts vont s'écrire dans ce listener
document.addEventListener('DOMContentLoaded', function (){

    /* Sélecteurs */

    /* Sélection naturelle */
    console.log(masection); // Prend l'intégralité de la section

    /* Sélection par id */
    // => On ne peut avoir qu'un ID par page donc facile et un seul élément
    console.log(document.getElementById('masection'));
    // Affectation dans une variable puis utilisation
    let section = document.getElementById('masection');
    console.log(section);
    section.style.color = "red";
    // Changer l'intérieur de la balise : ajout de texte
    section.innerHTML += " + Magic System";


    // Sélection par balise (tag)  
    let mesParagraphes = document.getElementsByTagName('p');
    console.log(mesParagraphes);
    // Chrome : #123456
    mesParagraphes[1].style.backgroundColor = "turquoise";
    mesParagraphes[2].style.color = "purple";

    /* Sélection par class */
    let classAvion = document.getElementsByClassName('avion');
    console.log(classAvion);
    classAvion[0].style.border = "1px solid orange";

    // Sélection de l'image => 1ère image, on prend l'index 0
    let monImg = document.getElementsByTagName("img")[0];
    console.log(monImg);
    // Je peux accéder aux attributs avec get et set
    console.log(monImg.getAttribute("alt"));
    monImg.setAttribute('class', 'nouvelleclasse');

    /* Selecteur universel */
    // Sélectionne selon les critères entre parenthèses

    // Sélection du premier élément répondant aux critères 
    // querySelector
    // Ici : le premier élément qui a la classe voiture
    console.log(document.querySelector(".voiture")); 

    // Pour sélectionner tous les éléments : querySelectorAll
    console.log(document.querySelectorAll(".voiture")); 

    // Sélection multiple sur différents éléments
    let mesElements = document.querySelectorAll("#masection, span, .avion");

    // Utilisation en chaîne avec une boucle
    console.log(mesElements);

    // J'obtiens les détails de la NodeList : propriétés + méthodes
    for (let m in mesElements) {
        console.log("Elements " + m + " " + mesElements[m]);
    }
    
    // On travaille uniquement sur les éléments du DOM
    for (let n = 0 ; n < mesElements.length; n ++) {
        mesElements[n].style.backgroundColor="papayawhip";
    }

}); // Fin du DOM Loaded