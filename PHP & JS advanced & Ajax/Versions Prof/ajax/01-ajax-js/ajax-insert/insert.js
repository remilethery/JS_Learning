document.addEventListener('DOMContentLoaded', function () {

    liste();

    document.getElementById('formulaire').addEventListener('submit', function (e) {
        e.preventDefault(); // neutralisation de la soumission
        let nom = document.getElementById('nom').value;
        let prenom = document.getElementById('prenom').value;
        let email = document.getElementById('email').value;

        let param = "action=ajout&nom=" + nom + "&prenom=" + prenom + "&email=" + email;
        ajout(param);
    });

    function liste() {
        r = new XMLHttpRequest();
        param = 'action=liste';
        r.open('POST', 'insert.php', true);
        r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        r.send(param);
        r.onreadystatechange = function () {
            if (r.readyState == 4 && r.status == 200) {
                let obj = JSON.parse(r.responseText);
                document.getElementById('liste').innerHTML = obj.liste;
                // retour de liste
                let mesSpan = document.querySelectorAll('span');
                if (mesSpan.length > 0) {
                    for (let k = 0; k < mesSpan.length; k++) {
                        mesSpan[k].addEventListener('click', function () {
                            if (confirm('Etes vous certain(e) de supprimer cet employé?')) {
                                let cible = this.getAttribute('cible');
                                param = 'action=del&cible=' + cible;
                                supprime(param);
                            }
                        });
                    }
                }
            }
        }
    }
    function ajout(param) {

        r = new XMLHttpRequest();
        r.open('POST', 'insert.php', true);
        r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        r.send(param);
        r.onreadystatechange = function () {
            if (r.readyState == 4 && r.status == 200) {
                // controles eventuels de la réponse            
                liste();
            }
        }
    }

    function supprime(param) {
        r = new XMLHttpRequest();
        r.open('POST', 'insert.php', true);
        r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        r.send(param);
        r.onreadystatechange = function () {
            if (r.readyState == 4 && r.status == 200) {
                liste();
            }
        }
    }


});