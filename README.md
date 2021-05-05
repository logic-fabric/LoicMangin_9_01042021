# Billed - Avril 2021

Code source du **Projet 9** - **_Débuggez et testez un SaaS RH_** du parcours **Développeur Front-end** d'_OpenClassrooms_.

## Page de démonstration

Le rendu de ce code est accessible sur cette [GitHub Page dédiée](https://logic-fabric.github.io/LoicMangin_9_01042021/) (uniquement la page de login, en l'absence d'installation des dépendances, installation impossible sur une _GitHub Page_).

### Lancer l'application en local

Cloner le projet : `git clone https://github.com/logic-fabric/LoicMangin_9_01042021.git`

Aller au repo cloné et installer les **packages npm** (indiqués dans le `package.json`) : `npm install`

Installer **live-server** pour pouvoir lancer un serveur local : `npm install -g live-server`

Lancer le serveur : `live-server`

Aller à l'adresse : `http://127.0.0.1:8000/`

### Lancer les tests en local avec _Jest_

`npm run test`

### Lancer un seul test

Installer **jest-cli** : `npm i -g jest-cli`

Lancer le test avec : `jest src/__tests__/yourTestFile.js`

### Voir la couvertur de test

Aller à l'adresse : `http://127.0.0.1:8000/coverage/lcov-report`
