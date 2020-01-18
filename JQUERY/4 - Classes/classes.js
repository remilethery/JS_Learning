/***********  Les classes  *************/


// Début Document ready : 
$(function(){

    /* Modifier la classe d'un élément */

    $("#changeClass").click(function(){
        
        $("#mydiv")
        // Pour supprimer la classe
            .removeClass("div1")
        // Pour ajouter une classe
            .addClass("div2");
    });

    $("#changeClass2").click(function(){
        
        $("#mydiv")
        // Pour passer entre deux classes
            .toggleClass("div1")
            .toggleClass("div2");
    });


    /* Pour récupérer / afficher l'attribut d'un élément */
    // attr(attribut) == getter;
    // attr(attribut, valeur) == setter

    // On cherche l'attribut source de l'image pour l'afficher dans la console
    console.log( $("img").eq(0).attr("src"));

    // On change l'attribut sur l'évènement onclick
    $("img").click(function(){
        $(this)
        .attr("src", "https://picsum.photos/400/400/?v="
                        +Math.round(Math.random()*1000));
    });


    /* On peut également charger une page à l'intérieur d'une autre, 
            ici dans une div */

    $("#target").load("page2.html");


    // Exemple pour un popup déclaré dans index, 
    // avec un effet de blur sur la div main
    $(document).dblclick(function(){
        $("main").css({
            filter: "blur(10px)"
        });
        $("#popup").slideDown();
    });

    $("#popup").click(function(){
        $("#popup").slideUp();
        $("main").css({
            opacity: "",
            filter: ""
        })
    })


}); // Fin document ready