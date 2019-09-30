//creates the gamefield
function createGamefield(){
    var myCanvasDiv = document.createElement('div');
    myCanvasDiv.setAttribute("id", "myCanvas");

    var player1Div = document.createElement('div');
    player1Div.setAttribute("id", "player1");

    var player2Div = document.createElement('div');
    player2Div.setAttribute("id", "player2");

    var missilesDiv = document.createElement('div');
    missilesDiv.setAttribute("id", "missiles");

    var bonusEnemyDiv = document.createElement('div');
    bonusEnemyDiv.setAttribute("id", "bonus");

    var enemiesDiv = document.createElement('div');
    enemiesDiv.setAttribute("id", "enemies");

    var startButton = document.createElement('button');
    startButton.setAttribute("onClick", "start()");
    startButton.innerHTML = "SinglePlayer";

    var startMultButton = document.createElement('button');
    startMultButton.setAttribute("onClick", "startMult()");
    startMultButton.innerHTML = "Multiplayer";

    var footerDiv = document.createElement('div');
    footerDiv.setAttribute("id", "footer");

    var scoreDiv = document.createElement('div');
    scoreDiv.setAttribute("id", "score");
    scoreDiv.innerHTML = "Player1 Score: 0";

    var lifeDiv = document.createElement('div');
    lifeDiv.setAttribute("id", "life");

    var bPlayer1 = document.createElement('b');
    bPlayer1.innerHTML = "Player 1: ";

    var progressPlayer1 = document.createElement('progress');
    progressPlayer1.setAttribute("min", 0);
    progressPlayer1.setAttribute("max", 100);
    progressPlayer1.setAttribute("value", 100);

    var bPlayer2 = document.createElement('b');
    bPlayer2.innerHTML = "Player 2: ";
    bPlayer2.setAttribute("style", "visibility: hidden");

    var progressPlayer2 = document.createElement('progress');
    progressPlayer2.setAttribute("min", 0);
    progressPlayer2.setAttribute("max", 100);
    progressPlayer2.setAttribute("value", 100);

    document.body.appendChild(myCanvasDiv);

    enemiesDiv.appendChild(startButton);
    enemiesDiv.appendChild(startMultButton);
    
    myCanvasDiv.appendChild(player1Div);
    myCanvasDiv.appendChild(player2Div);
    myCanvasDiv.appendChild(missilesDiv);
    myCanvasDiv.appendChild(bonusEnemyDiv);
    myCanvasDiv.appendChild(enemiesDiv);
    myCanvasDiv.appendChild(footerDiv);
    
    footerDiv.appendChild(scoreDiv);
    footerDiv.appendChild(lifeDiv);
    
    lifeDiv.appendChild(bPlayer1);
    bPlayer1.appendChild(progressPlayer1);
    lifeDiv.appendChild(bPlayer2);
    bPlayer2.appendChild(progressPlayer2);

}
