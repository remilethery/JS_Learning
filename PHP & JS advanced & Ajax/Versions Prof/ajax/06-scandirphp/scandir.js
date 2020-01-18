$(function(){

    $.ajax({
        url : 'scandir.php',
        dataType :'json',
        success : (reponse)=>{ 
            //for(let k=0; k<reponse.length;k++){}
            for(let img of reponse){
                $('body').append('<img src="'+img+'" alt="'+img+'">');
            }
        }
    });


});