
// BEG DOM ready
$(function(){

    let dossier = "./img/";
    let extensions = ['jpg', 'png', 'gif', 'jpeg'];


    $.ajax ({
        url: dossier,
        success: (reponse) => {
            for (let ext of extensions) {
                $(reponse)
                    .find("a[href$='."+ext+"']")
                    .each(function() {
                            let fichier = $(this).attr("href");
                            $("body").append("<img src='" 
                                            + dossier 
                                            + fichier
                                            +"' alt='gratin miam miam'>");
                    }); // end each
            } // end for

        }

    });



}); // END DOM ready