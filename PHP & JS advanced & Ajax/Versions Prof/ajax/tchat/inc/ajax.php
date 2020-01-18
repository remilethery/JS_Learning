<?php
require_once('init.php');
extract($_POST);
$tab=array();

switch($action){

    case 'deco':
        $resultat = $pdo->prepare("UPDATE membre SET date_active=0 WHERE id_membre=:id_membre");
        $resultat->execute(array('id_membre' => $_SESSION['id_membre']));
        session_destroy();
        $tab['valid']='ok';
    break;
    case 'online':
        $resultat = $pdo->query("SELECT * FROM membre WHERE date_active >=".(time() - 15 * 60)." ORDER BY pseudo");
        // ORDER BY date_active DESC
        $tab['users'] = $resultat->fetchAll();
        $pdo->query("UPDATE membre SET date_active=".time()." WHERE id_membre=".$_SESSION['id_membre']);

    break;
    case 'send':
        // insertion message
        // commande admin
        if($_SESSION['id_membre'] == 1 && $message=="!clear"){
            $pdo->query("DELETE FROM dialogue");
            $message='a lancé la commande admin pour nettoyer les messages';
            $tab['menage'] = true;
        }

        $message = htmlspecialchars($message);
        if(($message != '')){
            $r = $pdo->prepare("INSERT INTO dialogue VALUES (NULL,:id_membre,:msg,NOW())");
            $r->execute(array(
                'id_membre' => $_SESSION['id_membre'],
                'msg' => $message
            ));
        }
    break;
    case 'lastid':
        $r = $pdo->query("SELECT MAX(id_dialogue) as lastid FROM dialogue");
        $tab['lastid'] = $r->fetch()['lastid'];
        /*
        $reponse = $r->fetch();
        $tab['lastid'] = $reponse['lastid'];
        */
    break;
    case 'display':
        // tenir compte de la fonction d'affichage de départ
        if(isset($start) && $start) $lastid = $_SESSION['startid'];
        $r = $pdo->prepare("
        SELECT * FROM dialogue d
        INNER JOIN membre m ON d.id_membre = m.id_membre WHERE d.id_dialogue > :lastid ORDER BY d.date");
        $r->execute(array('lastid' => floor($lastid)));
        $tab['messages'] = array();
         $i=0;
        $tab['lastid'] = $lastid;
        while($message = $r->fetch() ){
            $tab['messages'][$i]['pseudo'] = $message['pseudo'];
            $tab['messages'][$i]['message'] = $message['message'];
            $tab['messages'][$i]['heureminute'] = date('H:i',strtotime($message['date']));
            $tab['messages'][$i]['ville'] = $message['ville'];
            $tab['lastid'] = $message['id_dialogue'];
            $i++;
        }
        /*
        $tab['messages'] = $r->fetchAll();
        $tab['lastid'] = $tab['messages'][count( $tab['messages'])-1]['id_dialogue'];
        */
    break;
    case 'acceptCookies':
        $expiration = time() + 365 * 24 * 3600;
        setCookie('acceptCookies',true,$expiration,'/');
        // nom, value, expiration, chemin d'accès
        $tab['valid'] = 'ok';
    break;

}
echo json_encode($tab);