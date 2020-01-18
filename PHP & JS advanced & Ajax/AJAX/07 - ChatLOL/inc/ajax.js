// BEG DOM ready

$(function () {


    /* ----------------  Gestion AVATAR  ------------------ */
    // Gestion du drop du fichier dans la zone html
    $("html")
        .on("dragover", (e) => {
            e.stopPropagation();
            e.preventDefault();
            $("#depotavatar")
                .css("border", "5px dashed orange");
        })
        .on("drop", (e) => {
            e.stopPropagation();
            e.preventDefault();
            $("#depotavatar")
                .css("border", "");
        });

    $("#depotavatar")
        .on("dragenter", (e) => {
            e.stopPropagation();
            e.preventDefault();
        })
        .on("dragleave", (e) => {
            e.stopPropagation();
            e.preventDefault();
        })
        .on("drop", (e) => {
            e.stopPropagation();
            e.preventDefault();
            $("#depotavatar")
                .css("border", "");
            let fichier = e.originalEvent.dataTransfer.files;
            checkFile(fichier);
        });

    $("#avatar")
        .on("change", (e) => {
            checkFile(e.target.files);
        });


    // Types de fichiers autorisés
    let ext = ['image/jpeg','image/png','image/gif'];

    // Méthode vérification du fichier + upload
    function checkFile(fic) {
        // console.log(fic);
        if (fic.length > 0) {

            if (fic[0].size > 0 && fic[0].size < 2.048e6) {
                // Contrôle type MIME // fait partie des types autorisées dans ext
                if ($.inArray(fic[0].type, ext) != -1) {

                    $('#avatar')[0].files = fic;
                    let reader = new FileReader();
                    reader.readAsDataURL(fic[0]);
                    reader.onload = (e) => {
                        let image = new Image();
                        image.src = e.target.result;     
                        
                        $(image).on('load',()=>{
                            console.log(image.width+'x'+image.height);
                            if(image.width > 1200 || image.height > 1200 ){
                                $('#depotavatar').html('Format max non respecté 1200x1200');
                                $('#avatar').removeProp('files');
                            }
                            else{                            
                                $('#depotavatar').html('<img src="' + e.target.result + '" alt="' + fic[0].name + '" class="img-fluid w-25">');
                            }
                        });
                    }

                } else {
                    $("#depotavatar")
                        .html("Format de fichier non reconnu : "
                                + fic[0].type);
                    $("#avatar").removeProp("files");
                }
            }
            else{
                $('#depotavatar').html('Taille maxi : 2Mo. Votre fichier fait '+(fic[0].size/1.024e6).toFixed(2)+'Mo');
                // je retire le fichier de mon input file
                $('#avatar').removeProp('files');
            }

        }
    }

    if ( $('#memoavatar').val() != "") {
        $("#depotavatar")
                .html("<img src='avatars/"
                        + $("#memoavatar").val()                                    
                        +"' class='w-25 img-fluid'>");
    }
    


    /* ----------------  FONCTIONS du CHAT  ------------------ */
    let timer = null;
    let timer_membres = null;
    const cible = "inc/ajax.php"; // Déclaration de la constante du fichier ajax
    let lastid = 0;

    if ($("#message_chat").length > 0) {

        // Mémoriser le point de départ de MAJ des messages :
        $.post(cible,
            { action: "lastid" },
            (retour) => {
                lastid: retour.lastid
            },
            "json");

               // Lancement des timers de l'arrichage des messages
        timer = setInterval(affichage_message, 3000);
        timer_membres = setInterval(affichage_membres, 6000);
    }
       
    // Fonctions lancées au démarrage, après la connexion

    /* Affichage des membres à la première connexion */
    if ($("#liste_membre_connecte").length > 0) {
        affichage_membres();
    }
    /* Affichage des messages en attente */
    if ($("#message_chat").length > 0) {
        affichage_message_start();
    }


 
  

    /* Affichage des messages sur la div html */
    function affichage_message() {
        $.post(cible,
            {
                action: "display",
                lastid: lastid
            },
            (retour) => {
                let html = "";
                for (let i = 0; i < retour.messages.length; i++) {
                    html += "<p>" + retour.messages[i].heureminute
                        + " - "
                        + retour.messages[i].pseudo
                        + " : "
                        + retour.messages[i].message
                        + "</p>";
                }
                $("#message_chat").append(html);
                // mettre à jour lastid
                lastid = retour.lastid;
                // scroller la fenêtre
                $('#message_chat').scrollTop($('#message_chat')[0].scrollHeight);
            },
            "json"
        );
    }

    /* Affichage des messages en cas de reconnexion */
    function affichage_message_start() {
        $.post(cible,{
            action : 'display',
            start : true
        },(retour)=>{
            // Mettre les nouveaux messages en append
            let html = '';
            for(let i=0; i<retour.messages.length;i++){
                html += '<p>'+retour.messages[i].heureminute+' - '+retour.messages[i].pseudo+' : '+ retour.messages[i].message +'</p>';
            }
            $('#message_chat').append(html);           
            // scroller la fenetre
           // $('#message_chat').scrollTop( $('#message_chat')[0].scrollHeight);
        },'json');
    }

    /* Affichage des membres */
    function affichage_membres() {
        $.post(cible,
            { "action": "online" },
            (retour) => {
                // Tableau retour.users
                html = "";
                for (let i = 0; i < retour.users.length; i++) {
                    //Construction de la liste des membres connectés
                    html += "<div class='d-flex align-items-center justify-content-start'>"
                        + "<img src='avatars/" + retour.users[i].avatar + "' class='avatar'"
                        + "alt='" + retour.users[i].pseudo + "'>"
                        + "<p> - " + retour.users[i].pseudo + "</p>"
                        + "</div>";
                }
                $("#liste_membre_connecte").html(html);
            },
            "json"
        )

    }

    

    // Gestion du bouton Send
    $("#submit") 
        .on("click", (e) => {
            e.preventDefault();
            // Envoyer un message : 
            // Récupération du message saisi
            clearInterval(timer);
            let message = $("#message").val()
            // Envoi à php pour insertion
            $.post(cible,
                {
                    action: "send",
                    message: message,
                },
                (retour) => {
                    affichage_message();
                    // Vider le champ
                    $("#message").val("");
                    // Déplacer le focus
                    $("#message").focus("");
                    timer = setInterval(affichage_message, 3000);
                },
                "json"
            )
        });

    // Gestion de la déconnexion
    $("#deco_button") // Bouton de déconnexion
        .on("click", (e) => {
            e.preventDefault();
            $.post(cible, // Utilisation du fichier ajax
                { "action": "deco" },
                (retour) => { // success
                    if (retour.valid == "ok") { location.reload(); }
                },
                "json"
            );
        })



    /************************ Gestion Cookies  *******************/
    if ( $(".cookies").length > 0) {
        let cookies = document.cookie.split(";");
        console.log(cookies);
        let acceptCookies = false;
        for (let k in cookies) {
            let details = cookies[k].split("=");
            if (details[0].trim() == "acceptCookies") {
                acceptCookies = true;
            }
        }
        if (!acceptCookies) {
            $(".cookies")
                .animate({
                    bottom : 0
                }, 1000);
        }

    }

    /* Gestion bouton j'ai compris des cookies */
    $("#accept")
        .click( () => {
            $.post(
                cible,
                {action: "acceptCookies"},
                (retour) => {
                    $(".cookies").animate({
                        bottom: "-100px"
                    }, 1000)
                },
                "json"
            );
        });



    /* Gestion profil */


    $("#profil")
        .click( () => {
            $.post(

            )

        });



}); // END DOM ready