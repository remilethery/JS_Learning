// BEG. DOM Loaded
document.addEventListener("DOMContentLoaded",
function(){

    document.getElementById("charge")
        .addEventListener("click", charge);

    
    function charge(){
        let objAjax = new XMLHttpRequest();

        objAjax.onreadystatechange = function() {
            console.log(objAjax.readyState);
            console.log(objAjax.status);

            if (objAjax.readyState == 4 && objAjax.status == 200) {
                document.getElementById("resultat").innerHTML = 
                    objAjax.responseText;
            }
        }


        objAjax.open("GET", "fichier.txt", true);
        objAjax.send();
    }

}); // END DOM Loaded