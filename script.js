const Player = require("./player");
const dom = require("./dom");

const game = (() => {
  let player1;
  let player2;
  let currentPlayer;
  let gameOver = false;

  // Initialize a new game
  function startGame() {
    
    // Initialize 2 players  
    player1 = Player("human");
    player2 = Player("cpu");

    currentPlayer = player1; // Set the first player as the current player

    // Place ships for both players (using the Ship factory)
    player1.gameboard.placeShip(3, 0, 0, "horizontal"); // Create a ship of length 3 at coordinates 0,0
    player2.gameboard.placeShip(3, 5, 5, "vertical"); // CPU player places a ship

    // Render the gameboards on the DOM
    dom.renderGameboard(player1, "player-gameboard");
    dom.renderGameboard(player2, "enemy-gameboard");

    // Add event listener for clicks on the enemy gameboard
    dom.addGameboardClickListener(player1, player2, handleAttack);
  }

  // Handle a player attack
  function handleAttack(x, y) {
    if (gameOver) return;

    const hit = currentPlayer.attack(player2.gameboard, x, y);
    if (hit) {
      dom.renderGameboard(player2, "enemy-gameboard");
    }

    if (player2.gameboard.allShipsSunk()) {
      gameOver = true;
      alert("Player 1 wins!");
      return;
    }

    // If it’s the computer’s turn, let it attack
    currentPlayer = player2;
    computerTurn();
  }

  // Computer’s turn to attack
  function computerTurn() {
    if (gameOver) return;

    player2.attack(player1.gameboard);

    dom.renderGameboard(player1, "player-gameboard");

    if (player1.gameboard.allShipsSunk()) {
      gameOver = true;
      alert("Computer wins!");
      return;
    }

    currentPlayer = player1; // Switch back to player 1
  }

  return {
    startGame,
  };
})();

game.startGame();
