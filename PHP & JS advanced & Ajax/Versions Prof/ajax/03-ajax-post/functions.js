$(function(){

    $('#nom').on('input',()=>{
        //console.log($('#nom').val());
        if( $('#nom').val().length> 0){

            $.post('traitement.php',{recherche : $('#nom').val() },
            (retour) =>{
                $('#employes').html(retour.resultats);
            },
            'json'
            );
        }else{
            $('#employes').html('') ;
        }
    });


    /*     
    $.post(fichiercible,params,function_en_cas_de_succes(reponse){},format);
    
    $.ajax({
        url : fichiercible,
        method : 'post',
        data : params,
        dataType : format,
        success : function_en_cas_de_succes(reponse){}
    });

    */



}); // FIN DR