


// On peut attribuer une id à un élement css avec attr

// Beginning DOM ready
$(function(){

    let nbColumn = 0;
    let divid = 0;
    let taskid = 0;

    $(".addlist")
        .click(function(){
                
                $("#div"+divid)
                    
                    .after("<div class='col' id='div"+ (++divid) +"'></div>");
                
                $("#div"+divid)
                    .append("<div class='task' id='task"+taskid+"'></div>");

                $("#task"+divid-1)
                    .append("<input type='text'>")
                    .draggable();


            taskid++;
        });

    // $(".col").

    



});

