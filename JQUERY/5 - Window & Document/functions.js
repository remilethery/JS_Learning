/***********  Window & Document  *************/


// Début Document ready : 
$(function(){

    $("p").css({
        maxWidth: "960px",
        margin: "0 auto",
        textAlign: "justify"
    });


    // Typiquement : 
    // Call to Action lorsque l'utilisateur a parcouru 
    // un certain pourcentage de l'article
    $(window).scroll(function(){

        let hauteurDoc = $(document).height();
        console.log(hauteurDoc);
        let hauteurWind = $(window).height();
        console.log(hauteurWind);

        let percentScrolled = Math.round($(window).scrollTop() * 100 
                                    / (hauteurDoc - hauteurWind));

        console.log('Nbre de pixels parcourus :' + $(window).scrollTop());
        console.log('Pourcentage parcouru :' + percentScrolled + "%");
    });

    $(window).resize(function(){
        console.log("Votre fenêtre mesure :" + $(window).width() + "x" + $(window).height());
    });


    /* On peut connaître la position d'un élément avec les méthodes offset et position
    Ici, par rapport au top - on pourrait aussi utiliser le left

    Position à partir d'un parent
    $(element).position().top

    Position absolue par rapport au document
    $(element).offset().top

    */

    $("#parent").css("position", "relative");
    $("foireux").css("position", "absolute");

    console.log("Position de l'intrus : " + $("#foireux").offset().top);

    console.log("Position de l'intrus : " + $("#foireux").position().top);


}); // Fin document ready