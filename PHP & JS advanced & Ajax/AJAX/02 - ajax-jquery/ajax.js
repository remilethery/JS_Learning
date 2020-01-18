// BEG DOM ready

$(function(){


    $("#charge")
        .click(function(){
            $.ajax({
                    url : "fichier.txt",
                    dataType : "text",
                    success : (retour) => {
                        $("#resultat").html(retour);
                    }
                });
        });





}); //END of DOM ready