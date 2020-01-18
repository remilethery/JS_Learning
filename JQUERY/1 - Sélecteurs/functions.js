/***********  Les sélecteurs *************/

// Document ready : anciennement :
// $(document).ready(function)() { .... CODE ..... }


// Document ready : nouvelle méthode :
$(function(){


    /**  Sélection par TAG: **/
    // Sélectionne tous les tags similaires, ici span : $('span').
    // Pour sélectionner un seul span : $('span').eq(0).
    // + Changement d'une propriété CSS
    $('span').css('color', 'red');
    // Changement de plusieurs propriétés CSS : par la notation JSON
    $('span').css(
        {'background': 'yellow',
         'font-size' : '1.5rem' 
         // rem (root em) Calcule la taille relative par rapport 
         // à la taille globale du html
        });


    /** Sélection par ID **/
    // Changement d'une propriété pour #masection
    $('#masection').css('border', '1px solid green');


    /** Sélection par classe **/
    // Sélectionne tous les éléments de la même classe -> applique une ppté css
    $('.voiture').css('background', 'blue');
    
    // Sélectionne tous les éléments impairs -> applique ppté css
    $('.voiture:nth-child(odd)').css('background', 'lightgreen');

    // Sélection multiple -> applique ppté css
    $('h1, .avion, #masection').css('font-style', 'italic');


    /* 
    Sélection d'un élément avec une valeur d'attribut particulière
    Exemple : toutes les images dont le titre est Paris
    $("img[title='paris']");
       
    Sélection d'un élément par lui-meme : 
    $(this);

    Sélection par type
    $(':radio');
    */

    



});