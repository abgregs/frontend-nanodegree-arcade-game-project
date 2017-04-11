Front-End Web Development Nano-Degree - Frogger Arcade Game
===============================

What is it?
-----------

This is an arcade game I built using HTML5 canvas and object-oriented javascript. It consists of the following folders and files:

CSS FOLDER
----------

  style.css
  ---------
  A simple CSS file with no customization.

JS FOLDER  
---------

  engine.js
  ---------
  Contains the game loop functionality to draw the game board and call the render and update methods that keep the game moving.

  app.js
  ------
  The player, enemy, and gem classes and methods are implemented here. These are sprites drawn on the game board that move and interact with one another. The methods used to display and update the player score and number of lives are also contained here.

  resources.js
  ------------
  This is simply an image loading utility to simplify the process of loading image files so that they can be used within the game.

  IMAGES FOLDER
  Contains the image files used for displaying the game.

Downloading and running the game
-------------------------------

1 Find the files by going to the GitHub repository: https://github.com/abgregs/frontend-nanodegree-arcade-game
2 Clone the repository to your local machine: https://help.github.com/articles/cloning-a-repository/
3 Open the index.html file in your web browser. You should see text displaying the number of lives and the score, and a game board with three enemy bugs moving from left to right across the board, one gem, and one player character.

How to play the game
--------------------

The objective of the game is to collect as many points as possible. Points are collected in two ways: 1) by advancing the player past the enemy bugs and into the water and 2) by collecting gems. A gem is collected by moving the player onto a space that has a gem. When the gem is collected, the player earns 150 points and a new gem appears in a random location on the game board. When a player advances into the water, 100 points are awarded and the player's location is reset to the starting position.

The player begins with 5 lives. Enemy bugs must be avoided or else the player's location resets, one life is taken away from the player, and 100 points are subtracted from the player's score. The game ends when the player runs out of lives. When the player loses his last life, the game starts over.



1 Find the project titled  github repository
