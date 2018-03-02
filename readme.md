# Connect 4


## Procédure de départ

```
git clone https://github.com/ACorrot/NodePower4.git directory
cd directory
docker-compose up -d mongo
docker-compose run dev bash

npm install (A faire dans le container dev)
exit

docker-compose up server

```
Ensuite aller sur http://localhost:8000

Je ne savais pas s'il fallait mettre l'installation de mongo, etc, du coup je ne l'ai pas mise.


## Technos utilisées

- Chalk
- Compression
- Docker
- Express
- Mongodb
- Morgan
- Nodemon
- Readline
- Semantic



## Bugs

Je n'ai pas pu mettre les couleurs, ni déclencher la condition de victoire/défaite/draw.
Je peux par contre récupérer les ID des cases où on clique, et j'ai essayé d'être DRY au possible, même si le code n'est pas très propre.

## Ce qui fonctionne

A peu près "tout". Création de partie, historique des parties, mise en place du plateau de jeu, création et affichage des joueurs, les clics qui fonctionnent,
(J'ai mis le petit scroll que tu attendais :) )