const {
        start,
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
        } = require('./util');

        
var player1 = {
        top: 600,
        left: 600,
        life: 100,
        score: 0,
        class: "player1",
        missileClass: "missile",
        missile: [],
        alive: true,
        control: [37, 38, 39, 40, 32]
    };

var player2 = {
        top: 600,
        left: 300,
        life: 100,
        score: 0,
        class: "player2",
        missileClass: "missileP2",
        missile: [],
        alive: true,
        control: [65, 87, 68, 83, 81]
    };

enemies = [
    {left: 200, top: 100, health: 10, points: 10, level: 1},
    {left: 300, top: 100, health: 10, points: 10, level: 1},
    {left: 400, top: 200, health: 20, points: 20, level: 2},
    {left: 500, top: 200, health: 20, points: 20, level: 2},
    {left: 600, top: 300, health: 30, points: 30, level: 3},
    {left: 700, top: 300, health: 30, points: 30, level: 3}
]

var enemymissiles = [];
    enemymissiles.push({
        left: 200,
        top: 400,
        level: 1
        });
    enemymissiles.push({
        left: 400,
        top: 400,
        level: 2
        });
    enemymissiles.push({
        left: 600,
        top: 400,
        level: 3
        });
        enemymissiles.push({
        left: 600,
        top: 648,
        level: 3
        });

var bonusEnemy = [
        {left: 0, top: 0}
        ];

test('if all functions are defined', () => {
    expect(start).toBeDefined();
    expect(controlPlayer).toBeDefined();
    expect(startMult).toBeDefined();
    expect(drawPlayerMissiles).toBeDefined();
    expect(drawEnemyMissiles).toBeDefined();
    expect(drawEnemies).toBeDefined();
    expect(spawnEnemyMissiles).toBeDefined();
    expect(spawnBonusEnemy).toBeDefined();
    expect(drawPlayer).toBeDefined();
    expect(movePlayerMissiles).toBeDefined();
    expect(moveEnemyMissiles).toBeDefined();
    expect(moveEnemies).toBeDefined();
    expect(moveBonusEnemy).toBeDefined();
    expect(enemyShot).toBeDefined();
    expect(bonusEnemyShot).toBeDefined();
    expect(playerShot).toBeDefined();
    expect(showScore).toBeDefined();
    expect(showLife).toBeDefined();
    expect(thread).toBeDefined();
    expect(gameIsOver).toBeDefined();

});


test('the controls of player1 (left and up)', () => {

    const keys = [];
    keys[37] = true;
    keys[38] = true;
    controlPlayer(player1, keys);
    expect(player1.left).toEqual(596);
    expect(player1.top).toEqual(598);
    controlPlayer(player1, keys);
    controlPlayer(player1, keys);
    controlPlayer(player1, keys);
    controlPlayer(player1, keys);
    expect(player1.left).toEqual(580);
    expect(player1.top).toEqual(590);

});

test('the controls of player1 (right and down + missileshot)', () => {

    const keys = [];
    keys[39] = true;
    keys[40] = true;
    keys[32] = true;

    controlPlayer(player1, keys);
    expect(player1.missile.length).toEqual(1);
    expect(player1.missile[0].left).toEqual(600);
    expect(player1.missile[0].top).toEqual(590);
    controlPlayer(player1, keys);
    controlPlayer(player1, keys);
    controlPlayer(player1, keys);
    controlPlayer(player1, keys);
    expect(player1.left).toEqual(600);
    expect(player1.top).toEqual(600);
    expect(player1.missile.length).toEqual(1);
    expect(player1.missile[0].left).toEqual(600);
    expect(player1.missile[0].top).toEqual(590);
});

test('the controls of player2 (left and up)', () => {

    const keys = [];
    keys[65] = true;
    keys[87] = true;
    controlPlayer(player2, keys);
    expect(player2.left).toEqual(296);
    expect(player2.top).toEqual(598);
    controlPlayer(player2, keys);
    controlPlayer(player2, keys);
    controlPlayer(player2, keys);
    controlPlayer(player2, keys);
    expect(player2.left).toEqual(280);
    expect(player2.top).toEqual(590);

});

test('the controls of player2 (right and down + missileshot)', () => {

    const keys = [];
    keys[68] = true;
    keys[83] = true;
    keys[81] = true;

    controlPlayer(player2, keys);
    expect(player2.missile.length).toEqual(1);
    expect(player2.missile[0].left).toEqual(304);
    expect(player2.missile[0].top).toEqual(590);
    controlPlayer(player2, keys);
    controlPlayer(player2, keys);
    controlPlayer(player2, keys);
    controlPlayer(player2, keys);
    expect(player2.left).toEqual(300);
    expect(player2.top).toEqual(600);
    expect(player2.missile.length).toEqual(1);
    expect(player2.missile[0].left).toEqual(304);
    expect(player2.missile[0].top).toEqual(590);
});

test('if a player can move out of gamefield (left and up) ', () => {

    player2.top = 550;
    player2.left = 100;
    const keys = [];
    keys[65] = true;
    keys[87] = true;

    controlPlayer(player2, keys);
    expect(player2.left).toEqual(96);
    expect(player2.top).toEqual(548);
    //out of gamefield
    controlPlayer(player2, keys);
    expect(player2.left).toEqual(96);
    expect(player2.top).toEqual(548);
    
});

test('if a player can move out of gamefield (right and down)', () => {

    player2.top = 600;
    player2.left = 1050;
    const keys = [];
    keys[68] = true;
    keys[83] = true;

    controlPlayer(player2, keys);
    expect(player2.left).toEqual(1054);
    expect(player2.top).toEqual(602);
    //out of gamefield
    controlPlayer(player2, keys);
    expect(player2.left).toEqual(1054);
    expect(player2.top).toEqual(602);
    
});


test('if missiles from Player1 are moving', () => {

    movePlayerMissiles(player1);
    movePlayerMissiles(player1);
    movePlayerMissiles(player1);
    expect(player1.missile[0].top).toEqual(572);
}); 

test('if missile is spliced up after it left the gamefield', () => {
   
    player2.missile[0].top = 8;
    movePlayerMissiles(player2);
    expect(player2.missile[0].top).toEqual(2);
    expect(player2.missile.length).toEqual(1);
    movePlayerMissiles(player2);
    expect(player2.missile.length).toEqual(0);
});


test('if the missiles from the enemies are moving and splice if out of gamefield', () => {

    expect(enemymissiles.length).toEqual(4);

    moveEnemyMissiles(enemymissiles);
    moveEnemyMissiles(enemymissiles);
    moveEnemyMissiles(enemymissiles);

    expect(enemymissiles[0].top).toEqual(406);
    expect(enemymissiles[1].top).toEqual(412);
    expect(enemymissiles[2].top).toEqual(418);
    //enemymissiles.top > 650 => splice up 
    expect(enemymissiles.length).toEqual(3);
});

test('if the enemies shoot missiles', () => {
    expect(enemymissiles.length).toEqual(3);

    //difficult to test this mehtod because the missiles
    //spawn randomly but it works
    spawnEnemyMissiles(enemies, enemymissiles);
    spawnEnemyMissiles(enemies, enemymissiles);
    spawnEnemyMissiles(enemies, enemymissiles);

    expect(enemymissiles.length).toBeGreaterThanOrEqual(3);
});

test('if player can shoot enemies', () => {

    player2.missile.push({
        left: 200,
        top: 151,
        class: player2.missileClass
        });
    
    enemyShot(player2, enemies);
    expect(player2.missile.length).toBe(1);
    expect(enemies.length).toBe(6);
    //movePlayerMissiles -> top: 145
    //enemy lvl1 was shot -> 10 points for player
    movePlayerMissiles(player2);
    enemyShot(player2, enemies);
    expect(player2.missile.length).toBe(0);
    expect(enemies.length).toBe(5);
    expect(player2.score).toBe(10);

    player2.missile.push({
        left: 720,
        top: 355,
        class: player2.missileClass
        });
    
    enemyShot(player2, enemies);
    expect(player2.missile.length).toBe(1);
    expect(enemies.length).toBe(5);
    //movePlayerMissiles -> top: 349
    //enemy lvl3 was shot -> enemylife - 10 health
    movePlayerMissiles(player2);
    enemyShot(player2, enemies);
    expect(player2.missile.length).toBe(0);
    expect(enemies.length).toBe(5);
    expect(enemies[4].health).toBe(20);
    expect(player2.score).toBe(10);

});

test('if player can shoot bonusEnemy', () => {

    bonusEnemy.left = 200;
    bonusEnemy.top = 100;
    player2.missile.push({
        left: 200,
        top: 151,
        class: player2.missileClass
        });
    player2.score = 0;

    bonusEnemyShot(player2, bonusEnemy);
    expect(player2.missile.length).toBe(1);
    expect(bonusEnemy.left).toBe(200);
    expect(bonusEnemy.top).toBe(100);
    //movePlayerMissiles -> top: 145
    //bonusEnemy was shot -> score = 50
    movePlayerMissiles(player2);
    bonusEnemyShot(player2, bonusEnemy);
    expect(player2.missile.length).toBe(0);
    expect(player2.score).toBe(50);
    expect(bonusEnemy.left).toBe(1150);
    expect(bonusEnemy.top).toBe(100);

});

test('if enemy can shoot a player', () => {

    enemymissiles = [];
    expect(enemymissiles.length).toEqual(0);
    enemymissiles.push({
        left: 200,
        top: 489,
        level: 2
        });
    enemymissiles.push({
        left: 200,
        top: 482,
        level: 3
        });
    expect(enemymissiles.length).toEqual(2);
    
    player1.left = 200;
    player1.top = 500;
    
    playerShot(player1, enemymissiles);
    expect(enemymissiles.length).toEqual(2);
    expect(player1.life).toBe(100);

    //first missile (lvl2)  from enemies hit the player
    moveEnemyMissiles(enemymissiles);
    playerShot(player1, enemymissiles);
    expect(enemymissiles.length).toEqual(1);
    expect(player1.life).toBe(80);

    //second missile (lvl3) from enemies hit the player
    moveEnemyMissiles(enemymissiles);
    playerShot(player1, enemymissiles);
    expect(enemymissiles.length).toEqual(0);
    expect(player1.life).toBe(50);

});