// BEG. DOM Loaded
$(function(){

    // 1ère méthode
    charge = () => {
        let id_employe_current = $("#id_employe").val();
        $.ajax({
            url: "interro.php",
            method: "post",
            dataType: "json",
            data : { id_employe : id_employe_current },
            success : (retour) => {
                console.log("Exécuté en "+ (Date.now()-temps) + "ms");
                $("#resultat").append(retour.resultats+"<br>");
            },
            beforeSend : () => {
                temps = Date.now();
            }
        });
    }

    $("#charge")
        .click(charge);

}); // END DOM Loaded