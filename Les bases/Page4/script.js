/* DOM et Manipulation */

// Début DOM Loaded
document.addEventListener("DOMContentLoaded", function(){

    // Création d'éléments
    let myDiv = document.createElement("div");
    let myPara = document.createElement("p");
    
    // Ajout d'un enfant dans body - appendChild
    document.body.appendChild(myDiv);
    myDiv.appendChild(myPara);
    // Ajout de texte dans l'élément
    myPara.innerHTML = "De la nourriture pour vos esprits !";

    // Suppression d'un enfant
    // document.body.removeChild(myPara);

    // Pour mettre du contenu au tout début de la page :
    document.body.innerHTML = "<p class='guy'></p>" + document.body.innerHTML;

    // Dates
    function afficheDate(){
        let today = new Date();
        let date = today.getDate();
        let heure = today.getHours();
        heure = (heure < 10) ? "0"+heure : heure;
        let minute = today.getMinutes();
        minute = (minute < 10) ? "0"+minute : minute;
        let secondes = today.getSeconds();
        secondes = (secondes < 10) ? "&#127936;"+secondes : secondes;
        let nomMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                        "Juillet", "Août", "Septembre", "Octobre",
                        "Novembre", "Décembre"];
        let nomJours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi",
                        "Vendredi", "Samedi"];
        //getDay renvoie un chiffre entre 0 et 6 / dimanche = 0;
        let jour = nomJours[today.getDay()];
        //getMonth renvoie un chiffre entre 0 et 11
        let mois = nomMois[today.getMonth()];                
        let annee = today.getFullYear();
        

        myPara.innerHTML = "<br>Date : " + date + " - Heure : " + heure + ":" + minute +":" + secondes;
        myPara.innerHTML += "<br> Jour de la semaine : " + jour;
        myPara.innerHTML += "<br> Mois : " + mois;
        myPara.innerHTML += "<br> Année : " + annee;

        document.body.appendChild(myDiv);
    }

    // Appelle la fonction toutes les x secondes ; 1000 = 1 seconde
    setInterval(afficheDate, 1000);
    

    function messageConsole(){

        console.log("Cela fait déjà " + "5" + " secondes que tu es ici");
    }

    // Appelle la fonction au bout de x secondes
    setTimeout(messageConsole, 5000);

    // Déplacer un élément
    document.getElementById("move").addEventListener("click", function(){
        this.style.left = "400px";
    })


    // Cliquer sur carré
    document.getElementById("move2").addEventListener("click", function(){
        // On doit initialiser la position, sinon JS génère une erreur 
        // si on veut récupérer la valeur actuelle de left de move2
        // car elle ne contient rien du tout dans css
        let pos = 0;
        // timer2 récupère le handle du "thread" de setinterval
        let timer2 = setInterval(deplacement, 25);
        function deplacement(){
            if (pos == 400) {
                // Arrête le handle timer2
                clearInterval(timer2);
            } else {
                pos +=5;
                document.getElementById("move2").style.left = pos + "px";
            }
        }
    });

    document.addEventListener("keydown", deplaceImage);

    function deplaceImage(e){
        console.log(e.keyCode);
        // Haut : 90, 38
        // Droit : 68, 39
        // Bas : 83, 40
        // Gauche : 81, 37
        let perso = document.getElementById('perso');

        switch(e.keyCode){
            case 38:
            case 90:
                let haut = parseInt(perso.style.top);
                if (!haut) {haut = 0;}
                haut -= 100;
                perso.style.top = haut + "px";
                break;
            case 40:
            case 83:
                let bas = parseInt(perso.style.top);
                if (!bas) {bas = 0;}
                bas += 100;
                perso.style.top = bas + "px";
                break;
            case 68:
            case 39:
                let droit = parseInt(perso.style.left);
                if (!droit) {droit = 0;}
                droit += 100;
                perso.style.left = droit + "px";
                break;
            case 81:
            case 37:
                let gauche = parseInt(perso.style.left);
                if (!gauche) {gauche = 0;}
                gauche -= 100;
                perso.style.left = gauche + "px";

        }


    }


}); // Fin du DOM Loaded