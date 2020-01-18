<?php

require_once("init.php");
extract($_POST); // Crée des variables à partir de l'array $_POST
$tab = array();

switch ($action) {
    // Déconnexion du chat
    case "deco":
        $resultat = $pdo->prepare("UPDATE membre 
                                   SET date_active=0
                                   WHERE id_membre=:id_membre");
        $resultat->execute(array(
                            "id_membre" => $_SESSION["id_membre"]
                                ));
        session_destroy();
        $tab["valid"] = "ok";
        break;

    case "online":
        // Requête sur la liste des utilisateurs actifs
        $resultat = $pdo->query("SELECT *
                                 FROM membre
                                 WHERE date_active >=" 
                                        . (time() - 15 * 60) 
                                        . " ORDER BY pseudo");
        $tab["users"] = $resultat->fetchAll();
        $pdo->query("UPDATE membre
                    SET date_active="
                    .time().
                    " WHERE id_membre="
                    .$_SESSION['id_membre']);
        break;
        
    case "send":
        // insertion message
        $message = htmlspecialchars($message);
        if (!empty($message)){
            $requete = $pdo->prepare("INSERT INTO dialogue
                                      VALUES (NULL, :id_membre, :msg, NOW())");
            $requete->execute(array(
                "id_membre" => $_SESSION['id_membre'],
                "msg" => $message
            ));
        }
        break;

    case "lastid":
        $requete = $pdo->query("SELECT MAX(id_dialogue) as lastid 
                                FROM dialogue");
        $tab["lastid"] = $requete->fetch()["lastid"];
        break;

    case "display":
        if ( isset($start) && $start) {
            $lastid = $_SESSION['startid'];
        }
        $requete = $pdo->prepare("SELECT * FROM dialogue d
                                  INNER JOIN membre m ON d.id_membre =
                                  m.id_membre
                                  WHERE d.id_dialogue > :lastid
                                  ORDER by d.date");
        $requete->execute(array(
            "lastid" => floor($lastid)
        ));
        $tab['messages'] = array();
        $tab["lastid"] = $lastid;
        $i=0;
        while ($message = $requete->fetch()) {
            $tab["messages"][$i]["pseudo"] = $message["pseudo"];
            $tab["messages"][$i]["message"] = $message["message"];
            $tab["messages"][$i]["heureminute"] = date ("H:i", strtotime($message["date"]));
            $tab["lastid"] = $message["id_dialogue"];
            $i++;
        }
        break;

    case "acceptCookies":
        $expiration = time() + 365 * 24 * 3600;
        // Le chemin d'accès des cookies est à la racine !
        setCookie("acceptCookies", true, $expiration, "/");
        $tab["valid"] = "ok";
        break;

}

echo json_encode($tab);