<?php

/*
Simuler mails en localhost
1. Installer node.js
    https://nodejs.org/fr/
2. Dans invite de commande taper :
    npm install -g maildev
3. Lancer maildev en tapant
    maildev
4. Editer le php.ini et vérifier :
    SMTP = localhost
    smtp_port = 1025
    (rédémarrer wamp)
5. Mails visibles sur
   http://localhost:1080/
6. Stopper maildev avec CTRL + C dans l'invite
*/
mail('test@test.com','sujet','message');