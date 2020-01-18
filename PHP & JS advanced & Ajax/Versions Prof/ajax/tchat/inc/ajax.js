$(function () {

    // ---------- GESTION AVATAR ---------------- 
    $('html')
        .on('dragover', (e) => {
            e.stopPropagation();
            e.preventDefault();
            $('#depotavatar').css('border', '5px dashed orange');
        })
        .on('drop', (e) => {
            e.stopPropagation();
            e.preventDefault();
            $('#depotavatar').css('border', '');
        });
    $('#depotavatar')
        .on('dragenter', (e) => {
            e.stopPropagation();
            e.preventDefault();
        })
        .on('dragleave', (e) => {
            e.stopPropagation();
            e.preventDefault();
        })
        .on('drop', (e) => {
            e.stopPropagation();
            e.preventDefault();
            $('#depotavatar').css('border', '');
            let fichier = e.originalEvent.dataTransfer.files;
            checkFile(fichier);
        });

    $('#avatar').on('change', (e) => {
        checkFile(e.target.files);
    });

    let ext = ['image/jpeg', 'image/png', 'image/gif'];

    function checkFile(fic) {
        // console.log(fic);
        if (fic.length > 0) {

            // controle taille
            if (fic[0].size > 0 && fic[0].size < 2.048e6) {
                // controle type MIME
                // je vérifie que le type MIME du fichier fait partie de la liste autorisée ext
                if ($.inArray(fic[0].type, ext) != -1) {
                    $('#avatar')[0].files = fic;
                    let reader = new FileReader();
                    reader.readAsDataURL(fic[0]);
                    reader.onload = (e) => {
                        let image = new Image();
                        image.src = e.target.result;

                        $(image).on('load', () => {
                            console.log(image.width + 'x' + image.height);
                            if (image.width > 1200 || image.height > 1200) {
                                $('#depotavatar').html('Format max non respecté 1200x1200');
                                $('#avatar').removeProp('files');
                            }
                            else {
                                $('#depotavatar').html('<img src="' + e.target.result + '" alt="' + fic[0].name + '" class="img-fluid w-25">');
                            }
                        });
                    }
                } else {
                    $('#depotavatar').html('Format de fichier non reconnu ' + fic[0].type);
                    $('#avatar').removeProp('files');
                }
            }
            else {
                $('#depotavatar').html('Taille maxi : 2Mo. Votre fichier fait ' + (fic[0].size / 1.024e6).toFixed(2) + 'Mo');
                // je retire le fichier de mon input file
                $('#avatar').removeProp('files');
            }


        }
    }

    if ( $('#memoavatar').val() != '' ){
        $('#depotavatar').html('<img src="avatars/'+$('#memoavatar').val()+'" class="w-25 img-fluid">');
    }

    //------------------ FONCTION DU TCHAT ----------

    let lastid = 0;
    let timer = null;
    let timer_membres = null;
    const cible = 'inc/ajax.php';

    if ($('#message_tchat').length > 0) {

        // mémoriser le point de départ de MAJ des messages
        $.post(cible, { action: 'lastid' }, (retour) => {
            lastid = retour.lastid;
        }, 'json');
        timer = setInterval(affichage_message, 3000);
        timer_membres = setInterval(affichage_membre, 6000);  
    }

    function affichage_message() {
        $.post(cible, {
            action: 'display',
            lastid: lastid
        }, (retour) => {
            // Mettre les nouveaux messages en append
            let html = '';
            for (let i = 0; i < retour.messages.length; i++) {
                html += '<p>' + retour.messages[i].heureminute + ' - ' + retour.messages[i].pseudo + ' : ' + retour.messages[i].message + '</p>';
            }
            $('#message_tchat').append(html);
            // mettre à jour lastid
            lastid = retour.lastid;
            // scroller la fenetre
            $('#message_tchat').scrollTop($('#message_tchat')[0].scrollHeight);
            convertSmiley();
           
        }, 'json');
        
    }

    function affichage_message_start() {
        $.post(cible, {
            action: 'display',
            start: true
        }, (retour) => {
            // Mettre les nouveaux messages en append
            let html = '';
            for (let i = 0; i < retour.messages.length; i++) {
                html += '<p title="'+retour.messages[i].ville+'">' + retour.messages[i].heureminute + ' - ' + retour.messages[i].pseudo + ' : ' + retour.messages[i].message + '</p>';
            }
            $('#message_tchat').append(html);
            // scroller la fenetre
            $('#message_tchat').scrollTop($('#message_tchat')[0].scrollHeight);
            convertSmiley();
            
        }, 'json');
    }



    function affichage_membre() {
        $.post(cible, { action: 'online' }, (retour) => {
            // retour.users
            let html = '';
            for (let i = 0; i < retour.users.length; i++) {

                let avatar = (retour.users[i].avatar!='') ? retour.users[i].avatar : 'unknown.png';

                html += '<div class="d-flex align-items-center justify-content-start"><img src="avatars/' + avatar + '" alt="' + retour.users[i].pseudo + '" class="avatar"><p>' + retour.users[i].pseudo + '</p></div>';
            }
            $('#liste_membre_connecte').html(html);

        }, 'json');
    }

    // Ce qu'on lance au départ
    if ($('#liste_membre_connecte').length > 0) affichage_membre();
    if ($('#message_tchat').length > 0) affichage_message_start();

    $('#submit').on('click', (e) => {
        e.preventDefault();
        // Envoyer un message
        // recupération du message saisi
        clearInterval(timer);
        let message = $('#message').val();
        // envoi à php pour insertion
        $.post(cible, {
            message: message,
            action: 'send'
        }, (retour) => {
            affichage_message();
            // vider le champ
            $('#message').val('');
            // déplacer le focus
            $('#message').focus();
            timer = setInterval(affichage_message, 3000);
        }, 'json');




    });

    $('#deco_button').on('click', (e) => {
        e.preventDefault();
        $.post(cible, { action: 'deco' }, (retour) => {
            if (retour.valid == 'ok') location.reload();
        }, 'json');
    });

    /* ----------------- COOKIES ----------*/
    if ($('.cookies').length > 0) {

        //console.log(document.cookie);
        let cookies = document.cookie.split(';');
        //console.log(cookies);
        let acceptCookies = false;
        for (let k in cookies) {
            let details = cookies[k].split('=');
            if (details[0].trim() == 'acceptCookies') acceptCookies = true;
        }
        if (!acceptCookies) {
            $('.cookies').animate({
                bottom: 0
            }, 1000);
        }
    }
    $('#accept').click(() => {
        $.post(cible, {
            action: 'acceptCookies'
        }, (retour) => {
            $('.cookies').animate({
                bottom: '-100px'
            }, 1000);
        }, 'json');
    });


    /* ----- SMILEYS ---- */
        $('.smiley').click((e)=>{      
        let codeSmiley = $(e.target).attr('alt');
        $('#message').val( $('#message').val() + codeSmiley); 
        $('#message').focus();
    });

    function convertSmiley(){
        smileys ={
            ":\\)" : 'smiley1.png',
            ":\\(" : 'smiley2.png',
            ";\\)" : 'smiley3.png'
        }
        // 2 anti-slash car
        // ( et ) sont réservés en regexp
        // \ est réservé en js : caractère d'échappement

        for(k in smileys){
            $('#message_tchat').html(  $('#message_tchat').html().replace(new RegExp(k, 'g'),'<img class="smiley" src="smil/'+smileys[k]+'">') );
        }

    }


}); // FIN DU DR