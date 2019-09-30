//Variables that we'll need
var gameOver;
var player1;
var multiplayer = false;
var enemymissiles;
var enemies;
var enemyDirection;
var bonusEnemy;
var bonusEnemyInterval;
var directionChange;
var keys;
var game;
var highscore;

//declares all variables and start a game with thread();
//starts the mainthread
function start(){

    player1 = {
        top: 600,
        left: 575,
        life: 100,
        score: 0,
        class: "player1",
        missileClass: "missile",
        missile: [],
        alive: true,
        control: [37, 38, 39, 40, 32]
    };

    player2 = {
        top: 600,
        left: 300,
        life: 100,
        score: 0,
        class: "player2",
        missileClass: "missileP2",
        missile: [],
        alive: false,
        control: [65, 87, 68, 83, 81]
    };

    if(multiplayer) player2.alive = true;
    if (player2.alive){
        document.getElementById("player2").style.display = "block";
    }
    if (!player2.alive){
        document.getElementById("player2").style.display = "none";
    }
    
    enemymissiles = [];
    //enemies Positions, health and level
    enemies = [
        {left: 200, top: 100, health: 30, points: 30, level: 3},
        {left: 275, top: 100, health: 30, points: 30, level: 3},
        {left: 350, top: 100, health: 30, points: 30, level: 3},
        {left: 425, top: 100, health: 30, points: 30, level: 3},
        {left: 500, top: 100, health: 30, points: 30, level: 3},
        {left: 575, top: 100, health: 30, points: 30, level: 3},
        {left: 650, top: 100, health: 30, points: 30, level: 3},
        {left: 725, top: 100, health: 30, points: 30, level: 3},
        {left: 800, top: 100, health: 30, points: 30, level: 3},
        {left: 875, top: 100, health: 30, points: 30, level: 3},
        {left: 950, top: 100, health: 30, points: 30, level: 3},
        {left: 200, top: 150, health: 20, points: 20, level: 2},
        {left: 275, top: 150, health: 20, points: 20, level: 2},
        {left: 350, top: 150, health: 20, points: 20, level: 2},
        {left: 425, top: 150, health: 20, points: 20, level: 2},
        {left: 500, top: 150, health: 20, points: 20, level: 2},
        {left: 575, top: 150, health: 20, points: 20, level: 2},
        {left: 650, top: 150, health: 20, points: 20, level: 2},
        {left: 725, top: 150, health: 20, points: 20, level: 2},
        {left: 800, top: 150, health: 20, points: 20, level: 2},
        {left: 875, top: 150, health: 20, points: 20, level: 2},
        {left: 950, top: 150, health: 20, points: 20, level: 2},           
        {left: 200, top: 200, health: 10, points: 10, level: 1},
        {left: 275, top: 200, health: 10, points: 10, level: 1},
        {left: 350, top: 200, health: 10, points: 10, level: 1},
        {left: 425, top: 200, health: 10, points: 10, level: 1},
        {left: 500, top: 200, health: 10, points: 10, level: 1},
        {left: 575, top: 200, health: 10, points: 10, level: 1},
        {left: 650, top: 200, health: 10, points: 10, level: 1},
        {left: 725, top: 200, health: 10, points: 10, level: 1},
        {left: 800, top: 200, health: 10, points: 10, level: 1},
        {left: 875, top: 200, health: 10, points: 10, level: 1},
        {left: 950, top: 200, health: 10, points: 10, level: 1}
    ];

    bonusEnemy = [
        {left: 0, top: 0}
    ];

    keys = [];
    gameOver = false;
    enemyDirection = true;
    directionChange = false;
    game = setInterval(thread, 10);
    bonusEnemyInterval = setInterval(spawnBonusEnemy, 20000);
    highscore = JSON.parse(localStorage.getItem('highscore'));
    }

//checks document.onkeydown
document.onkeydown = function (e) {
    keys[e.keyCode] = true;
};

//checks document.onkeyup
document.onkeyup = function (e) {
    delete keys[e.keyCode];
};

//check if the pressed keys control the spaceship
function controlPlayer(player, k){
    if (player.alive){
    for (var i in k) {
        if (i == player.control[0]){
            if (player.left >= 100)
        player.left -= 4;
        }
        if (i == player.control[1]){
            if (player.top >= 550)
        player.top -= 2;
        }
        if (i == player.control[2]){
            if (player.left <= 1050)
        player.left += 4;
        }
        if (i == player.control[3]){
            if (player.top <= 600)
        player.top += 2;
        }
        if (i == player.control[4]){
            if (player.missile.length < 1){
            player.missile.push({
                left: player.left + 20,
                top: player.top,
                class: player.missileClass
                });
                }
        }
    }
}
}

//starts multiplayer game
function startMult(){
    multiplayer = true;
    document.getElementById("player2").style.display = "block";
    start();
}

//draws all missiles from one player
function drawPlayerMissiles(player) {
    for (let m = 0; m < player.missile.length; m++){
        document.getElementById("missiles").innerHTML +=
        `<div class='${player.missile[m].class}' style='left: ${player.missile[m].left}px; 
        top: ${player.missile[m].top}px;'></div>`;
    }
}

//draw all missiles from the enemies
function drawEnemyMissiles(missiles){
    for (let em = 0; em < missiles.length; em++){
        document.getElementById("missiles").innerHTML +=
        `<div class='missile${missiles[em].level}' style='left: ${missiles[em].left}px; 
        top: ${missiles[em].top}px;'></div>`;
    }
}

//draw all Enemies
function drawEnemies() {
        if (enemies.length == 0){
            gameOver = true;
        }
        document.getElementById("enemies").innerHTML = "";
        for (let e = 0; e < enemies.length; e++){
            document.getElementById("enemies").innerHTML +=
            `<div class='enemy${enemies[e].level}' style='left: ${enemies[e].left}px; 
            top: ${enemies[e].top}px;'></div>`;

        }
        document.getElementById("bonus").innerHTML =
    `<div id='bonusEnemy' style='left: ${bonusEnemy.left}px; top: ${bonusEnemy.top}px;'></div>`;
    }

//let the enemies shoot randomly a missile
function spawnEnemyMissiles(enemy, missiles){
    for (let e = 0; e < enemy.length; e++){
        let i = Math.floor(Math.random() * 1000);
        
        if(i == 1){
            missiles.push({
            left: enemy[e].left + 20,
            top: enemy[e].top + 50,
            level: enemy[e].level
            });
        }
    }
}

//"spawn" Bonus Enemy with style manipulation display = "block";
function spawnBonusEnemy(){
    bonusEnemy.left = 0;
    bonusEnemy.top = 50;
    document.getElementById("bonus").style.display = "block";
}

//moves a player through style-manipulation
function drawPlayer(player) {
    document.getElementById(`${player.class}`).style.left = player.left + "px";
    document.getElementById(`${player.class}`).style.top = player.top + "px";
}

//moves all missiles from a player, splice a missile out when out of range
function movePlayerMissiles(player){
    for (let m = 0; m < player.missile.length; m++){
    player.missile[m].top -= 6;
    if (player.missile[m].top < 0) player.missile.splice(m, 1);
    }
}

//moves all missiles from the enemies, splice a missile out when out of range
function moveEnemyMissiles(missiles){
    for (let em = 0; em < missiles.length; em++){
    missiles[em].top += 2 * missiles[em].level;
    if (missiles[em].top > 650) missiles.splice(em, 1);
    }
}

//moves the Enemies through style-manipulation
//if enemy "hits" the player1 (enemies[e].top +
//50 (enemies height) == player1.top) set gameOver on true
function moveEnemies(){
    for (let e = 0; e < enemies.length; e++){
        if (enemies[e].left < 100){ enemyDirection = false;
            directionChange = true;
        }
        if (enemies[e].left > 1050){ enemyDirection = true;
            directionChange = true;
        }
    }
    for (let e = 0; e < enemies.length; e++){
        if (enemyDirection)
            enemies[e].left -= 2;
        if (!enemyDirection)
            enemies[e].left += 2;
        if (directionChange){
            enemies[e].top += 10;
            if (enemies[e].top + 50 > player1.top ||
                enemies[e].top + 50 > player2.top){
            gameOver = true;
        }}
    }
    directionChange = false;
}

//moves the bonus Enemy
function moveBonusEnemy(){
    if(document.getElementById("bonus").style.display == "block"){
        if(bonusEnemy.left >= 1150){
            document.getElementById("bonus").style.display = "none";
        }
        else {
            bonusEnemy.left += 4;
        }
    }
}

//checks if a player hits a enemy with a missile
function enemyShot(player, enemy){
    for (let e = 0; e < enemy.length; e++){
        for (let m = 0; m < player.missile.length; m++){
            if (
            (player.missile[m].top <= enemy[e].top + 50) &&
            (player.missile[m].top >= enemy[e].top) &&
            (player.missile[m].left <= enemy[e].left + 50) &&
            (player.missile[m].left >= enemy[e].left)
            )
                {
                enemy[e].health -= 10;
                player.missile.splice(m, 1);
                if (enemy[e].health <= 0) {
                    player.score += enemy[e].points;
                    enemy.splice(e, 1);
                }}
        }
    }
}

//checks if a player hits the bonus enemy with a missile
function bonusEnemyShot(player, enemy){
    for (let m = 0; m < player.missile.length; m++){
        if (
        (player.missile[m].top <= enemy.top + 50) &&
        (player.missile[m].top >= enemy.top) &&
        (player.missile[m].left <= enemy.left + 50) &&
        (player.missile[m].left >= enemy.left)
        )
        {
            enemy.left = 1150;
            player.missile.splice(m, 1);
            player.score += 50;
        }
    }
}

//checks if player was hit with a missiles
function playerShot(player, missiles){
    for (let em = 0; em < missiles.length; em++){
        if (
        (missiles[em].top <= player.top + 30) &&
        (missiles[em].top >= player.top - 10) &&
        (missiles[em].left <= player.left + 40) &&
        (missiles[em].left >= player.left)
        )
            {
            player.life -= 10 * missiles[em].level;
            missiles.splice(em, 1);
            if (player.life <= 0){ 
                player.top = 600;
            player.alive = false;
            document.getElementById(`${player.class}`).style.display = "none";
            }
            }    
    }
}

//displays the score
function showScore(){
    if (multiplayer){
    document.getElementById("score").innerHTML = "Player1 Score: " + player1.score
    + " - Player2 Score: " + player2.score;
    }
    else {
    document.getElementById("score").innerHTML = "Player1 Score: " + player1.score;
    }
}

//displays the life
function showLife(){
    document.getElementById("life").getElementsByTagName("progress")[0].value =
    player1.life;
    document.getElementById("life").getElementsByTagName("progress")[1].value =
    player2.life;

    if (!multiplayer){
    document.getElementById("life").getElementsByTagName("b")[1].style.visibility =
    "hidden";
    }
    if (multiplayer){
    document.getElementById("life").getElementsByTagName("b")[1].style.visibility =
    "visible";
    }
}

//thread in Interval - draw and move all game Objetcs
function thread(){
    if (!multiplayer){
        if(!player1.alive)
        gameOver = true;
    }
    controlPlayer(player1, keys);
    drawPlayer(player1);
    moveEnemyMissiles(enemymissiles);
    movePlayerMissiles(player1);
    drawEnemies();
    spawnEnemyMissiles(enemies, enemymissiles);
    document.getElementById("missiles").innerHTML = "";
    drawPlayerMissiles(player1);
    drawEnemyMissiles(enemymissiles);
    moveEnemies();
    moveBonusEnemy();
    enemyShot(player1, enemies);
    bonusEnemyShot(player1, bonusEnemy);
    playerShot(player1, enemymissiles);
    showScore();
    showLife();

    if (multiplayer){
        if(!player1.alive && !player2.alive)
        {
            gameOver = true;
        }
    if(player2.alive){
    controlPlayer(player2, keys);
    drawPlayer(player2);
    movePlayerMissiles(player2);
    drawPlayerMissiles(player2);
    playerShot(player2, enemymissiles);
    enemyShot(player2, enemies);
    bonusEnemyShot(player2, bonusEnemy);
    }
    }

    if (gameOver == true){
        gameIsOver();
    }
}

//alert the winner, Score and Highscore
//clears both intervals and make new Start buttons
function gameIsOver(){
    if (multiplayer){
        player2.alive = false;
        player2.top = 600;
        drawPlayer(player2);
        if(player1.score > player2.score){
            if(player1.score > highscore){
                localStorage.setItem('highscore', JSON.stringify(player1.score));
                alert("Congratulations Player 1 - You won" +
                "\nNew Highscore: " + player1.score);
            }
            else {
                alert("Congratulations Player 1 - You won"
                + "\nScore: " + player1.score
                + "\n\nHighscore: " + highscore); 
            }
        }
        if(player2.score > player1.score){
            if(player2.score > highscore){
                localStorage.setItem('highscore', JSON.stringify(player2.score));
                alert("Congratulations Player 2 - You won" +
                "\nNew Highscore: " + player2.score);
            }
            else {
                alert("Congratulations Player 2 - You won"
                + "\nScore: " + player2.score
                + "\n\nHighscore: " + highscore); 
            }
        }
        if (player1.score == player2.score){
            if(player1.score > highscore){
                localStorage.setItem('highscore', JSON.stringify(player1.score));
                alert("Draw" +
                "\nNew Highscore: " + player1.score);
            }
            else {
                alert("Draw" + "\n\nHighscore: " + highscore); 
            } 
        }
    }
    else{
    if (player1.score > highscore){
        localStorage.setItem('highscore', JSON.stringify(player1.score));
        alert("Congratulations!\nNEW Highscore: " + player1.score);
    }
    else {
        alert("Your Score: " + player1.score  + "\n\nHighscore: " + highscore);
    }
    }

    multiplayer = false;
    player1.alive = false;
    clearInterval(bonusEnemyInterval);
    document.getElementById("bonus").style.display = "none";
    clearInterval(game);
    document.getElementById('player1').style.display = "block";
    document.getElementById("missiles").innerHTML = "";
    document.getElementById("enemies").innerHTML =
    `<button onclick='start()'>Singleplayer</button>
    <button onclick='startMult()'>Multiplayer</button>`;
}

module.exports = {  start,
                    controlPlayer,
                    startMult,
                    drawPlayerMissiles,
                    drawEnemyMissiles,
                    drawEnemies,
                    spawnEnemyMissiles,
                    spawnBonusEnemy,
                    drawPlayer,
                    movePlayerMissiles,
                    moveEnemyMissiles,
                    moveEnemies,
                    moveBonusEnemy,
                    enemyShot,
                    bonusEnemyShot,
                    playerShot,
                    showScore,
                    showLife,
                    thread,
                    gameIsOver
                };
