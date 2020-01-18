$(function(){

    let recherche = ()=>{
        let critere = $('#pays').val();
        if( critere.length > 0){
            $.ajax({
                url : 'interro.php',
                method : 'post',
                data : { recherche : critere },
                dataType : 'json',
                success : (retour) => {
                    let html='';
                    for(let k in retour.resultats){
                        html+='<p>'+retour.resultats[k].countryName+' ('+retour.resultats[k].capital+')</p>';
                        // countryName et capital sont des colonnes de la table
                    }
                    $('#resultats')
                        .html(html)
                        .css({
                        display : 'flex',
                        heigth : 'auto',
                        top: $('#resultats').prev('#pays').offset().top+25+'px',
                        left: $('#resultats').prev('#pays').offset().left+'px'
                    });
                }
            });

        }else{
            $('#resultats').css('display','none');
        }
    };

    $('#pays').on('input',recherche);



    $('body').find("img[alt$='svg']").each(function(){
        console.log($(this).attr('src'));
    })




});