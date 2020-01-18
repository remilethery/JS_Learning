/* DOM et évènements */

// Début DOM Loaded
document.addEventListener("DOMContentLoaded", function(){

    // Sélection de l'élément
    // Ajout d'un listener
    // Ajout d'une fonction anonyme
    document.getElementById("titre").addEventListener("click", function(){
        alert("C'est le titre TAVU");
    })

    // Sélection de l'élément
    // Utilisation d'une fonction nommée déclarée dans mon fichier script
    /* Evènement CLICK */
    document.getElementById("div1").addEventListener("click", changeCouleur);
    document.getElementById("div1").addEventListener("dblclick", changeCouleur3);

    function changeCouleur(){
        // this désigne l'élément concerné par le click
        this.style.background = "cyan";
    }

    // Evenements possible : dbclick à la place de "click"
    // Raccourci pour le addeventlistener click : onclick ; attention c'est une propriété

    document.getElementById("div2").onclick=changeCouleur;
    document.getElementById("div2").addEventListener("dblclick", changeCouleur3);

    /* Evènement MOUSEOVER */
    document.getElementById("div3").addEventListener("mouseover", changeCouleur2);
    document.getElementById("div3").addEventListener("mouseout", changeCouleur3);

    function changeCouleur2() {
        this.style.background = "lime";
    }
    function changeCouleur3() {
        // Revient à la couleur rien du tout = couleur initiale attribuée en CSS
        this.style.background = ""; 
    }

    /* Evènements MOUSEDOWN et MOUSEUP : décomposé en deux */
    document.getElementById("div4").addEventListener("mousedown", changeCouleur2);
    document.getElementById("div4").addEventListener("mouseup", changeCouleur3);

    /* Evènements FOCUS et BLUR par exemple dans les formulaires */ 
    document.getElementById("pseudo").addEventListener("focus", evidence);
    document.getElementById("pseudo").addEventListener("blur", normal);

    function evidence() {
        this.style.border = "1px solid red";
        this.style.background = "gold";
    }

    function normal() {
        this.style.border = "";
        this.style.background = "";
    }

    /* Evènement SUBMIT */
    // Soumission du formulaire :
        document.getElementById("formulaire").addEventListener("submit", soumission);

    function soumission(e) {
        // Neutralise le comportement naturel de l'évènement submit
        e.preventDefault();
        // Vérifie si l'attribut value du form pseudo est >= 3
        if (document.getElementById("pseudo").value.length >= 3) {
            // Soumet le formulaire après vérification
            this.submit();
        } else {
            alert("Merci de saisir au moins 3 caractères");
        }
    }

    /* Evènement KEYPRESS & KEYDOWN+KEYUP */
    document.getElementById("pseudo").addEventListener("keypress", 
            function(e) {
                console.log("Vous avez appuyé sur la touche " + e.keyCode);
                console.log("Vous avez appuyé sur la touche " + e.key);
                console.log(e);
            });

    document.getElementById("mdp").addEventListener("keydown", 
            function() {
                console.log("Touche appuyée");
            });

    document.getElementById("mdp").addEventListener("keyup", 
            function() {
                console.log("Touche relâchée");
            });

    document.getElementById("voir").addEventListener("click", 
            function(){
                if (document.getElementById("mdp").value.length > 0) {

                    let etat = document.getElementById("mdp").getAttribute("type");
                    if (etat == "text") {
                        document.getElementById("mdp").setAttribute("type", "password");
                        this.innerHTML = "&#128065;"
                    } else {
                        document.getElementById("mdp").setAttribute("type", "text");
                        this.innerHTML = "&#127866;"
                    }
                }
            });


            


}); // Fin du DOM Loaded