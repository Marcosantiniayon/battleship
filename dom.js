const dom = (() => {
  // Function to render the gameboard on the DOM
  function renderGameboard(player, elementId) {
    const gameboard = player.gameboard;
    const boardElement = document.getElementById(elementId);

    // Clear the board
    boardElement.innerHTML = "";

    // Create a 10 x 10 board (100 cells total)
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = i;
        cell.dataset.y = j;

        // Add styles based on gameboard state (e.g., hit, miss, ship)
        if (gameboard.isShipAt(i, j)) {
          cell.classList.add("ship");
        }
        if (gameboard.isHitAt(i, j)) {
          cell.classList.add("hit");
        } else if (gameboard.isMissAt(i, j)) {
          cell.classList.add("miss");
        }

        boardElement.appendChild(cell);
      }
    }
  }

  // Function to handle click events on the enemy's gameboard
  function addGameboardClickListener(player, enemyPlayer, callback) {
    const boardElement = document.getElementById("enemy-gameboard");
    boardElement.addEventListener("click", (e) => {
      const x = e.target.dataset.x;
      const y = e.target.dataset.y;

      if (x && y) {
        callback(parseInt(x), parseInt(y));
      }
    });
  }

  return {
    renderGameboard,
    addGameboardClickListener,
  };
})();

module.exports = dom;
