$(function(){

    let charge = ()=> {
        let id_employes = $('#id_employes').val();
        let temps;
        $.ajax({
            url : 'interro.php',
            method : 'post',
            dataType : 'json',
            data : { id_employes : id_employes },
            success : (retour)=>{
                console.log('Exécuté en '+(Date.now()-temps)+'ms');
                $('#resultat').html(retour.resultats);
            },
            beforeSend : ()=>{
                temps=Date.now();                
            }
        });
    }    
    $('#charge').click(charge);


});