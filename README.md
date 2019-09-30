Space Invaders

author: Marcel Nawrath

index.html: website which contains the game
gamefield.js: create the gamefield when page is loaded
util.js: all functions needed for this game
style.css: all classes and ids for the style of the game
./assets: contains all pictures needed for this game

After you opened index.html you can choose SinglePlayer or Multiplayer

Singleplayer:
start a singleplayer game

move the spaceship:
arrow left: moves spaceship to left
arrow right: moves spaceship to right
arrow up: moves spaceship to up
arrow down: moves spaceship to down
space: shoot a missile (you can't shoot a second missile until the first one dissappeared)

If your life is less than or equal 0 the game is over
If one enemy or more are at the same height as your spaceship the game is over

If the game is over you see your score and if you got a new highscore

Multiplayer:
start a multiplayer game

move the spaceship
Player1 (see above)

Player2 (red spaceship):
"A": moves spaceship to left
"D": moves spaceship to right
"W": moves spaceship to up
"S": moves spaceship to down
"Q": shoot a missile (you can't shoot a second missile until the first one dissappeared)

If the lives of both player is less than or equal 0 the game is over
If one enemy or more are at the same height as one spaceship the game is over

If the game is over you see the winner with their score and if the highscore was beaten