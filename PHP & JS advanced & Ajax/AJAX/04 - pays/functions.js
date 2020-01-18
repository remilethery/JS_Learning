// BEG DOM ready
$(function () {
    
    let recherche = () => {
        let critere = $("#pays").val();
        if ( critere.length > 0) {
            $.ajax({
                url: "requests.php",
                method: "post",
                data: {recherche: critere},
                dataType : "json",
                success : (retour) => {
                    // Construction du tableau à afficher :
                    // countryName && capital sont les colonnes de la table sql
                    let html = "<table><tr><th>Pays</th><th>Capitale</th></tr>";
                    for (let k in retour.resultats){
                        html += "<tr><td>" 
                                + retour.resultats[k].countryName 
                                + "</td><td>"
                                + retour.resultats[k].capital 
                                + "</td></tr>";
                    }
                    html += "</table>";
                    console.log(html);
                    $("#resultats")
                        .html(html)
                        .css({
                            display : "flex",
                            height: "auto",
                            top : $("#resultats").prev("#pays").offset().top+25+"px",
                            left: $("#resultats").prev("#pays").offset().left+"px",
                        });
                } // end success

            }); // end AJAX


        } else {
            $("#resultats")
                .css("display", "none");
        }

        
    }

    $("#pays")
        .on("input", recherche);


}); // END DOM ready