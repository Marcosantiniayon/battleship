import { handleAttack } from "./script.js";
const dom = (() => {
  // Function to render the gameboard on the DOM
  function renderGameboard(player, elementId) {
    const gameboard = player.gameboard;
    const boardElement = document.getElementById(elementId);

    // Clear the board
    boardElement.innerHTML = "";

    // Create a 10 x 10 visual of the board (100 cells total)
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = i;
        cell.dataset.y = j;

        // Mark cells on gameboard based on state
        if (gameboard.isShipAt(i, j)) {
          cell.classList.add("ship");
          // console.log("ship at ", i, " & ", j);
        }
        if (gameboard.isHitAt(i, j)) {
          cell.classList.add("hit");
          // console.log("hit at ", i, " & ", j);
        }
        if (gameboard.isMissAt(i, j)) {
          cell.classList.add("miss");
          // console.log("miss at ", i, " & ", j);
        }

        boardElement.appendChild(cell);
      }
    }
  }

  // Adds click event listener to attacking player board & calls handleAttack function
  function addGameboardClickListener(gameboard, handleAttack) {
    const boardElement = document.getElementById(gameboard);

    // Define the event listener function (important to be able to delete it later)
    function boardClickListener(e) {
      const x = e.target.dataset.x;
      const y = e.target.dataset.y;

      if (x && y) {
        handleAttack(parseInt(x), parseInt(y)); // Passes the clicked-on coordinates
      }
    }

    // Attach the event listener
    boardElement.addEventListener("click", boardClickListener);

    // Store the event listener reference on the element for later removal
    boardElement.boardClickListener = boardClickListener;
  }

  // Removes click event listener for defending player board
  function removeGameboardClickListener(gameboard) {
    const boardElement = document.getElementById(gameboard);

    // Check if the board has an active click listener and remove it if so
    if (boardElement.boardClickListener) {
      boardElement.removeEventListener("click", boardElement.boardClickListener);
      delete boardElement.boardClickListener; // Remove the reference to avoid memory leaks
    }
  }

  return {
    renderGameboard,
    addGameboardClickListener,
    removeGameboardClickListener,
  };
})();

export { dom };
