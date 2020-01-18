$(function(){

    $('#charge').click(function(){

        $.ajax({
            url : 'fichier.txt',
            dataType : 'text',
            success : (retour)=> {
                $('#resultat').html(retour);
            }
        });
    });
}); // Fin du Document Ready