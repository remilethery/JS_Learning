// BEG. DOM Loaded
document.addEventListener("DOMContentLoaded",
    function () {

        liste();

        document.getElementById("formulaire")
            .addEventListener("submit", function (e) {
                e.preventDefault(); // Neutralise le comportement de soumission par défaut
                // = recharge la page
                let nom = document.getElementById("nom").value;
                let prenom = document.getElementById("prenom").value;
                let email = document.getElementById("email").value;

                let param = "action=ajout&nom=" + nom + "&prenom=" + prenom + "&email=" + email;
                ajout(param);
            });

        function liste() {
            let objAjax = new XMLHttpRequest();
            let param = "action=liste";
            objAjax.open("POST", "insert.php", true);
            objAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            objAjax.send(param);
            objAjax.onreadystatechange = function () {
                if (objAjax.readyState == 4 && objAjax.status == 200) {
                    let obj = JSON.parse(objAjax.responseText);
                    document.getElementById("liste").innerHTML = obj.liste;
                }
                // retour de liste
                let mesSpan = document.querySelectorAll("span");
                if (mesSpan.length > 0) {
                    for (let k = 0; k < mesSpan.length; k++) {
                        mesSpan[k].addEventListener("click", function () {
                            if (confirm('Etes vous certain(e) de supprimer cet employé?')) {
                                let cible = this.getAttribute("cible");
                                let param = "action=suppr&cible=" + cible;
                                suppr(param);
                            }
                        });
                    }
                }
            }

        }

        function suppr(param) {
            alert(param);
            let objAjax = new XMLHttpRequest();
            objAjax.open("POST", "insert.php", true);
            objAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            objAjax.send(param);
            objAjax.onreadystatechange = function () {
                if (objAjax.readyState == 4 && objAjax.status == 200) {
                    liste();
                }
            }
        }

        function ajout(param) {
            let objAjax = new XMLHttpRequest();
            objAjax.open("POST", "insert.php", true);
            objAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            objAjax.send(param);
            objAjax.onreadystatechange = function () {
                // Contrôles éventuels de la réponse                
                if (objAjax.readyState == 4 && objAjax.status == 200) {
                    // Raffraichissement de la liste sur la page
                    liste();
                }
            }
        }


    }); // END DOM Loaded