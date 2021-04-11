<p align="center"><img src="readme/images/eseo_logo.png" width="400"></p>

# TP3 - Plateforme IOT
> *Dernière mise à jour le 11 avril 2021*

Dans le cadre de la matière *Plateforme IOT* de mon cursus Ingénieur (Semestre 8), j'ai du rendre le TP en suivant cet **[énoncé](https://github.com/hugoomdra/sample-infra-v2/blob/master/sujet/TP3.pdf)**.

Vous pouvez me contacter sur **[LinkedIn](https://www.linkedin.com/in/hugo-madureira/)** si vous avez des questions.

## Critère à remplir

- Installer npm jsonschema
- Vérifier les données json d'entrée à l'aide d'un schéma JSON
- Réaliser un mécanisme de Pulling

## Détails sur le Pulling

Voici la variable qui comprends les consignes que le serveur donne aux clients qui se connectent sur la route ***/pull***

`const consignes = [
"Je suis un serveur qui parle",
"Super encore un message",
"STOP"
]`

Le mot clef `STOP` permet d'indiquer aux serveurs de stopper la connexion avec le client.

Les autres phrases sont des messages que le client affiche.

Le code suivant permet de simuler un système de pulling, toute les 30sec, le serveur va envoyer au client
```js
let compteur = 0;
setInterval(() => {

    if(consignes[compteur] == "STOP"){
        res.end(JSON.stringify({"error":0,"message":"Fin de connexion"}));
    }else{
        res.write(JSON.stringify({"message": consignes[compteur]}))
    }
    compteur++;
    }, 30000)
```

## Tester le programme

Lancer un terminale et executer les commandes suivantes :

`npm install` va permettre d'installer les packages du projet via *npm*

`node bin/server.js` va permettre de lancer le serveur

Ensuite, lancer un autre terminale et executer la commande suivante ;

`node bin/client.js test pass` va permettre de lancer le client. **test** et **pass** correspondent aux login. Ils sont récupérés dans le programme afin de permettre l'authentification de l'utilisateur.

> Tous ce qui se trouve après le séparateur en dessous correspond au readme initial du projet.

---

# Quelques éléments pour commencer

## Documentations

- Le javascript: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference
- Les codes d'erreurs HTTP:
https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
- Le module http de nodejs: https://nodejs.org/api/http.html
- Le module express: https://expressjs.com/fr/4x/api.html

## package.json

Ce fichier contient la définition de notre application. Deux cibles
sont exécutable: "server" et "test". Pour les lancer:

- npm run server
- npm run test

Vous pouvez ajouter des cibles si vous le souhaitez.
