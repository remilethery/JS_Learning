// Début DOR
$(function(){

    /* Transformations CSS de base pour afficher des carrés */
    $("div").css({
        width: "50px",
        height: "50px",
        border: "1px solid black",
        margin: "10px"
    });

    $("#div1").css('background', 'blue');
    $("#div2").css('background', 'red');
    $("#div3").css('background', 'green');
    $("#div4").css('background', 'yellow');



    /******* Evènements : ******/
    /* Click */
    $('h1').on("click", function(){
        console.log("Titre cliquay");
    });

    /* Hover */
    $("#div1").hover(function(){
        $(this).css("background", "purple");
    });

    /* MouseEnter ; MouseLeave - Elles possèdent un alias JQUERY*/
            /*** Sans Factorisation */
            /*
            $("#div2").mouseenter(function(){
                $(this).css("width", "200px");
            });
            $("#div2").mouseleave(function(){
                $(this).css("width", "50px");
            });
    */
            /*** Avec Factorisation */
    $("#div2")
        .mouseenter(function(){
        $(this).css("width", "200px");
        })
        .mouseleave(function(){
        $(this).css("width", "50px");
        });

    /* Mousedown ; MouseUp - Ecouter un évènement de la même manière que JS Script */
    /* Comme elles possèdent un alias en jquery, on pourrait écrire .mousedown & .mouseup */
    $("#div3")
        .css("cursor", "zoom-in")
        .on("mousedown", function(){
            $(this).css({
                "transform": "scale(1.5)",
                "margin-top": "70px",
                "cursor" : "zoom-out"
            });

        })
        .on("mouseup", function(){
            $(this).css({
                "transform": "",
                "margin-top": "",
                "cursor" : "zoom-in"
            });
        });
    



}); // Fin DU DOR