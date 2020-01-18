/***********  Les effets et animations  *************/



// Début Document ready : 
$(function(){

    /************  EFFETS  ****************/

    /* Transformations CSS de base pour afficher des carrés */
    $("div").css({
        width: "50px",
        height: "50px",
        border: "1px solid black",
        margin: "10px",
    });

    $("#div1").css('background', 'blue');
    $("#div2").css('background', 'red');
    $("#div3").css('background', 'green');
    $("#div4").css('background', 'yellow');
    $("#div5").css('background', 'orange');
    $("#div6").css('background', 'pink');



    /* HIDE et SHOW */
    $("#div1").click(function(){
        // Vitesse rapide par défaut : $(this).hide();
        $(this).hide(600); // 600 millième de seconde pour se cacher
                           // slow, fast, etc
    });

    $(document).dblclick(function(){
        // $("#div1").show("slow"); // Mode normal
        /* Mode interrupteur : fonctionne sur les méthodes 
            où l'on a implémenté toggle*/
        $("#div1").toggle("slow");
    });

    /* FADEIN et FADEOUT - Fondu => Disparition */
    // Click sur div3 : disparition en 1000 millième de seconde
    $("#div3").on("click", function(){
        $(this).fadeOut(1000); // slow, fast, 800...
    });
    // Click sur div4 : réapparition de div3 - coucou !
    $("#div4").on("click", function(){
        // $("#div3").fadeIn(1000); // slow, fast, 800...
        // En mode Toggle
        // stop : arrête l'animation en cours
        $("#div3").stop().fadeToggle(2000);
    });

    /* FADETO - Pour atteindre un niveau d'opacité précis */
    $("#div5").click(function(){
        // Si on met fadeTo(1000, 0), on fait disparaître l'élément
        // totalement mais on garde l'espace sur la page
        $(this).fadeTo(1000, 0.2);
    });

    $("#div6").click(function(){
        // Si on met fadeTo(1000, 0), on fait disparaître l'élément
        // totalement mais on garde l'espace sur la page
        $("#div5").fadeTo(1000, 1);
    });

    /* SLIDEDOWN, SLIDEUP, SLIDETOGGLE */

    $("#ecran").css({
        width: "400px",
        height: "500px",
        background: "darkgreen",
        display: "none",
        position: "absolute" // Cache le contenu en dessous
    });

    $("#b1").click(function(){
        $("#ecran").slideDown(800);
    });
    $("#b2").click(function(){
        $("#ecran").slideUp(100);
    });
    $("#b3").click(function(){
        $("#ecran").slideToggle(1000);
    });


    /* Callback */
    $("#ecran").hover(function(){
        $('#ecran').css("background", "purple");
        
    }, function(){ //callback
        // Cette fonction ne s'exécutera que lorsque l'évènement se termine
        $('#ecran').css("background", "darkgreen");
    });


    /************  ANIMATIONS  ****************/

    // Animations : animate
    function k2000(){
    $("#anime")
        .css({
        background : "gold",
        position : "relative"
        // fontSize ou "font-size"
        })
        .animate({
            "left" : "400px",
        }, 1000,
        function(){
            $(this).fadeOut(800, function(){
                $(this).fadeIn(800);
            });
        })
        .animate({
            "left" : "0",
        }, 1000);
    }
    /* Exercice : Faire bouger un carré en carré */

    // En utilisant les animates successifs
    function infinie(){
    $("#anime2")
        .css({
            background: "turquoise",
            position: "relative"
        })
        .animate({
            "left" : "200px"
        }, 200
        )
        .animate({
            "left" : "200px",
            "top" : "200px"
        }, 300)
        .animate({
            "left" : "0px",
            "top" : "200px"
        }, 500)
        .animate({
            "left" : "0px",
            "top" : "0px"
        }, 800);
    }

    setInterval(infinie, 5000);
    setInterval(moveMove, 5000);
    setInterval(k2000, 3000);


    // En utilisant les callbacks
    function moveMove(){
    $('#move')
    .css({
        background : 'pink',
        position : 'relative'
    })
    .animate({
            left : '300px'
    },1000,function(){
        $(this).animate({
                top : '150px'
        },1000,function(){
            $(this).animate({
                // left : '-=300px'
                left : 0
            },1000,function(){
                $(this).animate({
                    top : 0
                },1000)
            });
        });
    });
    }


    /*
        Fonctions Annexes 

        .append();  ==> innerHTML += // rajoute du contenu à l'intérieur
        
        .html(); ==> Récupère le contenu
        .html("<h2>la base</h2>"); ==>  Remplace le contenu de l'élément
        
        .text(); ==> Récupère uniquement le texte, idem html()
        .text("blabla"); ==> Remplace le texte // Idem html sans prise en compte des balises

        .after(); ==> Ajoute du contenu après
        .before(); ==> Ajoute du contenu html avant
    */

    $("#anime").after("<h5>Carré qu'il est con</h5>");
    $("#ecran").before("<h3>La course de les carrés</h3>");
    $("#anime2").html("<h4>Carré</h4>");
    $("#move").text("<h4>Carré tout pété</h4>");


}); // Fin document ready