/****************** JQUERY UI ********************/

// Beginning DOM Ready

$(function () {

    $.datepicker.setDefaults(
        {
            altField: "#datepicker",
            closeText: 'Fermer',
            prevText: 'Précédent',
            nextText: 'Suivant',
            currentText: 'Aujourd\'hui',
            monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
            dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
            dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            weekHeader: 'Sem.',
            dateFormat: 'yy-mm-dd',
            firstDay: 1 /* premier jour à lundi */
        }
    );

    $("#madate").datepicker();

    let motscles = [
        "lion", "chien", "chat", "tigre", "dauphin", "girafe",
        "éléphant", "furet", "panthère", "sanglier", "serpent",
    ];

    $("#autocomplete")
        .autocomplete({
            source: motscles
        });

    $("#prix")
        .css({
            "width": "200px",
            "margin-top": "20px"
        })
        .slider({
            range: true,
            min: 0,
            max: 500,
            // Valeurs par défaut
            values: [100, 300],
            // Associer une fonction
            slide: function (event, ui) {
                console.log(ui.values[0] + " " + ui.values[1]);
                $("#montant").html(ui.values[0] + " - " + ui.values[1]);
            }
        });


    // Boîte à outil modulable en taille, draggable, et snappable
    $("#tools")
        .css({
            width: "150px",
            height: "150px"
        })
        .resizable({
            //animate : true   --- > pas terrible
            maxHeight: 600,
            maxWidth: 500,
            minWidth: 100,
            minHeight: 100,
            aspectRatio: 4 / 3
        })
        .draggable({
            containment: "body"
        });


    $("#depot")
        .css({
            width: '200px',
            height: '200px',
            border: '1px solid black'
        })
        .on('dragenter', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).html("deposer ici");
        })
        .on('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).html("deposer ici");
        })
        .on('drop', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).html("fichier déposé");
        });


    $('html')
        .on('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $("#depot").html("ICI !!!")
        })
        .on("drop", function (e) {
            e.stopPropagation();
            e.preventDefault();
        });


    $("#admis, #refuse")
        .draggable({
            revert: "invalid"
        })
        .css({
            width: "50px",
            height: "50px",
            border: "1px solid black"
        });
    $("#depot")
        .droppable({
            accept: "#admis",
            // drop propriété, on est toujours en json
            drop: function () {
                $(this).css("background", "green");
            }

        });


    $(".carre")
        .css({
        background: "blue",
        width: "50px",
        height: "50px"
        })
        .click(function(){
            $(this)
                //animate sur la couleur corrigé par JQuery UI
                .animate({
                    width: "1000px",
                    backgroundColor: "red"
                }, 3000, function(){
                    $(this)
                        .animate({
                            width: "100px",
                            backgroundColor: "green"
                        });
                });

        });

    $(".menu2")
        .css({
            border: "1px solid black",
            width: "400px",
            display: "none",
            position: "absolute",
            right: "50px",
            top: "50vh", // view height (affichage sur la hauteur)
            background: "rgba(125, 24, 33, 0.3"
        });
    $("#ouvrir")
        .click(function(){
            $(".menu2")
                .toggle("slide", {
                    direction: "right"
                }, 1000);
        });

    $("#changeClass")
        .click(function(){
            // $(this).toggleClass("rectangle");
            // Le délai est possible grâce à JQueryUI
            $(this).toggleClass("rond", 1000, "swing");

        });

    // On peut aussi utiliser des effets de paralaxe avec Scrolly => Télécharger puis appliquer
    // https://www.jqueryscript.net/animation/Simple-Parallax-Scrolling-Plugin-For-jQuery-scrolly.html

}); //End DOM ready