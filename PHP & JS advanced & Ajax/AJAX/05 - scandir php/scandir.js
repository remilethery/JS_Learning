
// BEG DOM ready
$(function(){

    $.ajax ({
        url: "scandir.php",
        dataType: "json",
        success: (reponse) => {
            //console.log(reponse);
            $("body")
                .append("<h1>Miam les bons gratins</h1>");
            for (let img of reponse){
                $("body")
                    .append("<img src='" 
                            +img
                            +"' alt='"
                            +img
                            +"'>" );
            }
            $("img")
            .css({
                display: "flex",
                margin: "10px",
                border: "1px solid black",
                "border-radius": "20px",
                width : "200px"
            });
        }

    });




}); // END DOM ready