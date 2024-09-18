import { Player } from "./player.js";
import { dom } from "./dom.js";

const game = (() => {
  let player1;
  let player2;
  let currentPlayer;
  let gameOver = false;

  // Initialize a new game
  function startGame() {
    // Initialize 2 players
    let type = "human";
    player1 = Player(type);
    player2 = Player(type);

    currentPlayer = player1; // Set the first player as the current player

    // Place ships for both players (using the Ship factory)
    player1.gameboard.placeShip(3, 0, 0, "horizontal"); // Create a ship of length 3 at coordinates 0,0
    player2.gameboard.placeShip(3, 5, 5, "vertical"); // CPU player places a ship

    // Render the gameboards on the DOM
    dom.renderGameboard(player1, "player1-gameboard");
    dom.renderGameboard(player2, "player2-gameboard");

    // Add event listener to current player gameboard
    if (currentPlayer === player1) {
      dom.addGameboardClickListener("player1-gameboard", handleAttack);
      dom.removeGameboardClickListener("player2-gameboard");  
    } else if (currentPlayer === player2) {
      dom.addGameboardClickListener("player2-gameboard", handleAttack);
      dom.removeGameboardClickListener("player1-gameboard");
    }

    console.log("Game Started");
  }

  // Handle a player attack based on the coordinates clicked. Calls attack function for current player on opponent and re-renders opponent's board.
  function handleAttack(x, y) {
    if (gameOver) return;

    // console.log('currentPlayer: ', currentPlayer);

    if (currentPlayer === player1) {
      const hit = player1.attack(player2.gameboard, x, y);
      dom.renderGameboard(player2, "player2-gameboard"); // Re-render enemy board after the attack

      if (player2.gameboard.allShipsSunk()) {
        alert("Player 1 wins!");
        return;
      }

      currentPlayer = player2; // Switch to player 2 and enable correcto board
      dom.addGameboardClickListener("player2-gameboard", handleAttack);
      dom.removeGameboardClickListener("player1-gameboard");
      console.log(`player 2's turn!`);

    } else if (currentPlayer === player2) {
      const hit = player2.attack(player1.gameboard, x, y);
      dom.renderGameboard(player1, "player1-gameboard"); // Re-render enemy board after the attack

      if (player1.gameboard.allShipsSunk()) {
        alert("Player 2 wins!");
        return;
      }
      currentPlayer = player2; // Switch to player 1 and enable correcto board
      dom.addGameboardClickListener("player1-gameboard", handleAttack);
      dom.removeGameboardClickListener("player2-gameboard");
      currentPlayer = player1;
      console.log(`player 1's turn!`);
    }
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
    console.log(`player 1's turn!`);

  }

  return {
    startGame,
  };
})();

game.startGame();
