$(function(){

    let dossier = './img/';
    let extensions = ['jpg','png','gif'];

    $.ajax({
        url : dossier,
        success : (reponse)=>{
            for(let ext of extensions){
                $(reponse).find("a[href$='."+ext+"']").each(function(){
                    let fichier = $(this).attr('href');
                    $('body').append('<img src="'+dossier+fichier+'" alt="'+fichier+'">');                   
                });
            }
            $('img').css('width','200px');        
        }
    });


});