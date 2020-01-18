/*************** JQuery: OnePage ***************/


//Beginning DOM Ready

$(function () {

    // Evènement click sur le burger menu => Afficher / Cacher le menu ul    
    $("#burger").click(function () {
        $("nav ul").slideToggle("slow");
    });

    // Evènement window resize - Ajustement du menu
    $(window).resize(function () {
        if ($(window).width() >= 768) {
            // Redonne l'aspect flex au menu ul
            $('nav ul').css("display", "flex");
        } else {
            // Cache le menu lorsque la fenêtre est redimentionnée
            if ($("nav ul").css("display") == "flex") {
                $("nav ul").css("display", "none");
            }
        }
    });

    // Carrousel
    // Nombre d'images dans le carrousel, on compte le nombre d'elts dans la reglette


    let nbSlides = $('.reglette img').length;
    // Ordonnancement des images pour les manipuler par la suite...
    function reorder() {
        for (let k = 0; k < nbSlides; k++) {
            $(".reglette img").eq(k).css("order", k);
        }
    }
    // ... au chargement de la page
    reorder();

    let compteurSlides = 0;
    // Appel de la func carrousel toutes les 3 sec
    let timer = setInterval(carrousel, 3000);

    function carrousel() {
        $(".reglette")
            .animate({
                left: "-100%"
            }, 2000, function () {

                // Repositionner la reglette sinon elle est décalée à gauche
                $(".reglette").css("left", 0);

                // Passer l'image à gauche en bout de reglette
                $(".reglette img").eq(compteurSlides).css("order", compteurSlides + nbSlides);
                // incrémenter le compteur de slides
                compteurSlides++;
            });
            // Repasser le compteur de slides à zéro pour éviter de passer à 
            // un index supérieur
            if ( compteurSlides == nbSlides) {
                compteurSlides = 0;
                reorder();
            }
    }

    function reverseCarrousel() {
        let lastOrder = compteurSlides + nbSlides - 1;
        for (let k = 0 ; k < nbSlides ; k++){
            if ($(".reglette img").eq(k).css("order") == lastOrder){
                $(".reglette img").eq(k).css("order", lastOrder - nbSlides);
            }
        }
        compteurSlides--;
        
        $(".reglette").css("left", "-100%");
        $(".reglette").animate({
            left:"0"}, 2000);

        if ( compteurSlides == -nbSlides) {
            compteurSlides = 0;
            reorder();
        }

    }


/* Exercice : Faire arrêter le carrousel quand on passe sur la souris*/
    $(".carrousel")
        .mouseenter(function(){
            clearInterval(timer);
        })
        .mouseleave(function(){
            timer = setInterval(carrousel, 3000);
        });
   
/* Avec un callback */
/*    $(".carrousel")
        .hover(function(){
            clearInterval(timer);
        }, function(){
            timer = setInterval(carrousel, 3000);
        })
*/


    $(".right")
        .click(function(){
            carrousel();
        });


    function goLeft(){
        // On neutralise le click
        $(".left")
            .off("click");
            // On lance la fonction
            reverseCarrousel();
            // On réactive le click au bout d'une seconde
            setTimeout(function(){
                $(".left").bind("click", goLeft);
            }, 1000);
    }
    // On binde la fonction une première fois
    $(".left").bind("click", goLeft);

        /*
    $(".left")
    .click(function(){
        reverseCarrousel(); 
    });
    */

    $("a").click(function(){
        let target = $(this).attr("href");
        if (target.substr(0,1) == "#"){
            $("html, body")
                .stop()
                .animate({
                    scrollTop : $(target).offset().top
                }, 600)
        }


    });

    // $(window).scroll(function(){
    //     $("#retourTop")
    //     .show()
    //     /*
    //     .mouseenter(function () {
    //         $(this).animate({'opacity':'1'}, 100);
    //      })
    //     .mouseleave(function (){
    //         $(this).animate({'opacity':'0.2'}, 100);
    //     })
    //     */
    //     .click(function(){
    //         $("html, body").animate({
    //             scrollTop : $("#top").offset().top
    //         }, 600)

    //     });

    $("#retourTop").click(function(){
        $("html, body").animate({
        scrollTop : $("#top").offset().top
        }, 600)
    });

    $(window).scroll(function(){
        if ( $(window).scrollTop() > 50 ) {
            console.log("je descends");
            $("#retourTop").css("display", "block");
        } else {
            $("#retourTop").css("display", "none");
        }
    });





}); // End DOM Ready