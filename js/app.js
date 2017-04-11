var gameStart = function () {
    // Display scoreboard
    ctx.clearRect(300, 0, 205, 60);
    ctx.font = '20px Georgia';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + player.score, 400, 20);
    ctx.fillText('Lives: ' + player.lives, 300, 20);

}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x += this.speed * dt;

    // check for collisions
    this.checkCollisions();
    gem.checkCollisions();


    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = -100;
        possibleY = [63, 145, 227];
        this.y = possibleY[Math.floor(Math.random() * 3)];
        this.speed = Math.floor((Math.random() * 250) + 50);
    };

    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};


// This is called inside Enemy.prototype.update so that everytime the enemy changes position, collisions are checked for between the player and enemy.
Enemy.prototype.checkCollisions = function() {
    if (player.x < this.x + 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        70 + player.y > this.y) {

        // do something here for colliding with enemy
        player.collide();

        // update player to starting position
        player.update();
    }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
  // Set starting score and lives for the player
    this.score = 0;
    this.lives = 5;

    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';

};


// This is called whenever there is a need to update the player's location to starting position. This happens when the player collides with an enemy or when the player reaches the water.
Player.prototype.update = function() {

    // Set x and y values used for starting position
    this.x = 202;
    this.y = 378;

};

Player.prototype.gemCapture = function () {

    // Update score
    this.score += 150;

    ctx.clearRect(300, 0, 205, 60);
    ctx.font = '20px Georgia';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + this.score, 400, 20);


    // Display lives
    ctx.fillText('Lives: ' + this.lives, 300, 20);

    // Display a win message
    ctx.font = '20px Georgia';
    ctx.fillStyle = 'green';
    ctx.fillText('You got a gem!', 150, 20);
    setTimeout(function() {

        ctx.clearRect(0,0, 300, 60);
    }, 500);
};


// This is called when the player reaches the water. The player's location // is updated to the starting position, points are added to the score, and a // message is displayed.

Player.prototype.win = function() {

    // Update player to starting position
    this.update();

    // Update score
    this.score += 100;

    ctx.clearRect(300, 0, 205, 60);
    ctx.font = '20px Georgia';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + this.score, 400, 20);


    // Display lives
    ctx.fillText('Lives: ' + this.lives, 300, 20);

    var allWinMessages = ['Great job!', 'Nice work!', 'Keep it up!', 'Good going!', 'You did it!', 'Awesome work!', 'Awesome job!'];

    // Display a win message
    ctx.font = '20px Georgia';
    ctx.fillStyle = 'green';
    ctx.fillText(allWinMessages[Math.floor(Math.random() * 7)], 0, 20);
    setTimeout(function() {

        ctx.clearRect(0,0, 300, 60);
    }, 500);

    gem.update();

};

Player.prototype.collide = function () {

  // Update player to starting position
  this.update();

  // Update score
  if (this.score < 100) {
      this.score = 0;
  }
  else {
      this.score -= 100;
  }

  ctx.clearRect(300,0, 205, 45);
  ctx.font = '20px Georgia';
  ctx.fillStyle = 'black';
  ctx.fillText('Score: ' + this.score, 400, 20);

  // Update lives and display message for normal case and when game over

  // If there are still lives left
  if (this.lives > 1){
      this.lives -= 1;
      ctx.fillText('Lives: ' + this.lives, 300, 20);

      // Display a collide message
      ctx.font = '20px Georgia';
      ctx.fillStyle = 'red';
      ctx.fillText('Ouch!', 0, 20);

      setTimeout(function() {

          ctx.clearRect(0,0, 300, 60);
      }, 500);
  }
  // If out of lives, start new game
  else {

    // Reset scoreboard for new game
    this.lives = 5;
    this.score = 0;
    ctx.clearRect(300,0, 205, 45);

    // Display new scoreboard
    ctx.font = '20px Georgia';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + this.score, 400, 20);

    // Display lives
    ctx.fillText('Lives: ' + this.lives, 300, 20);


    // Display new game message
    ctx.font = '20px Georgia';
    ctx.fillStyle = 'green';
    ctx.fillText('Out of lives, new game!', 0, 20);
    setTimeout(function() {

        ctx.clearRect(0,0, 300, 60);
    }, 500);


  }

}


// Draw the player on the screen, required method for game.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// This is called whenever the specified keys are pressed to move the player. It includes switch statements to account for the scenarios that mark boundaries for player's movement, including a case for when the player moves upward into the water (wins the game).

Player.prototype.handleInput = function(key) {
    switch(key){
        case 'up':

            if (this.y < 64 > 0) {

                // do something here for winning
                this.win();
                }

            else {
                this.y -= 82;
                }
        break;

        case 'down':
            if (this.y > 377) {
                // don't let player go off board
            }

            else {
                this.y += 82;
            }
        break;

        case 'left':
            if (this.x < 1) {
                // don't let player go off board
            }

            else {
                this.x -= 101;
            }
        break;

        case "right":
            if (this.x > 400) {
                // don't let player go off board
            }
            else {
                this.x += 101;
            }
        break;
    }
};

// Write gem class
// This class will have an update(), render(), and checkCollisions() function
var Gem = function() {

};

Gem.prototype.update = function () {

    var possibleX = [0, 101, 202, 303, 404];
    var possibleY = [63, 145, 227]
    var x = possibleX[Math.floor(Math.random() * 5)];
    var y = possibleY[Math.floor(Math.random() * 3)];

    // Different options that will be chosen randomly to determine what color gem to draw
    this.gemSprites = ['images/Gem-Blue.png', 'images/Gem-Green.png', 'images/Gem-Orange.png'];

    this.x = x;
    this.y = y;
    this.sprite = this.gemSprites[Math.floor(Math.random() * 3)];

}


Gem.prototype.checkCollisions = function () {
  // check for gem collisions

  if (player.x < this.x + 75 &&
      player.x + 65 > this.x &&
      player.y < this.y + 50 &&
      70 + player.y > this.y) {

      // Do something for capturing gem
      player.gemCapture();

      // Spawn new gem
      this.update();

    }
};

// Draw gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(202, 378);
var gem = new Gem();
Gem.prototype.update();

var createEnemies = function () {
    var x = 0;
    var possibleY = [63, 145, 227];
    for (i = 0; i < 3; i++) {
        var y = possibleY[Math.floor(Math.random() * 3)];
        speed = Math.floor((Math.random() * 250) + 50);
        var enemy = new Enemy(x, y, speed);
        allEnemies.push(enemy);
    }

};

createEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
