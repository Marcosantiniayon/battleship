/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dom: () => (/* binding */ dom)\n/* harmony export */ });\n/* harmony import */ var _script_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script.js */ \"./src/script.js\");\n\nconst dom = (() => {\n  // Function to render the gameboard on the DOM\n  function renderGameboard(player, elementId) {\n    const gameboard = player.gameboard;\n    const boardElement = document.getElementById(elementId);\n\n    // Clear the board\n    boardElement.innerHTML = \"\";\n\n    // Create a 10 x 10 visual of the board (100 cells total)\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const cell = document.createElement(\"div\");\n        cell.classList.add(\"cell\");\n        cell.dataset.x = i;\n        cell.dataset.y = j;\n\n        // Mark cells on gameboard based on state\n        if (gameboard.isShipAt(i, j)) {\n          cell.classList.add(\"ship\");\n          // console.log(\"ship at \", i, \" & \", j);\n        }\n        if (gameboard.isHitAt(i, j)) {\n          cell.classList.add(\"hit\");\n          // console.log(\"hit at \", i, \" & \", j);\n        }\n        if (gameboard.isMissAt(i, j)) {\n          cell.classList.add(\"miss\");\n          // console.log(\"miss at \", i, \" & \", j);\n        }\n\n        boardElement.appendChild(cell);\n      }\n    }\n  }\n\n  // Adds click event listener to attacking player board & calls handleAttack function\n  function addGameboardClickListener(gameboard, handleAttack) {\n    const boardElement = document.getElementById(gameboard);\n\n    // Define the event listener function (important to be able to delete it later)\n    function boardClickListener(e) {\n      const x = e.target.dataset.x;\n      const y = e.target.dataset.y;\n\n      if (x && y) {\n        handleAttack(parseInt(x), parseInt(y)); // Passes the clicked-on coordinates\n      }\n    }\n\n    // Attach the event listener\n    boardElement.addEventListener(\"click\", boardClickListener);\n\n    // Store the event listener reference on the element for later removal\n    boardElement.boardClickListener = boardClickListener;\n  }\n\n  // Removes click event listener for defending player board\n  function removeGameboardClickListener(gameboard) {\n    const boardElement = document.getElementById(gameboard);\n\n    // Check if the board has an active click listener and remove it if so\n    if (boardElement.boardClickListener) {\n      boardElement.removeEventListener(\"click\", boardElement.boardClickListener);\n      delete boardElement.boardClickListener; // Remove the reference to avoid memory leaks\n    }\n  }\n\n  return {\n    renderGameboard,\n    addGameboardClickListener,\n    removeGameboardClickListener,\n  };\n})();\n\n\n\n\n//# sourceURL=webpack://practice/./src/dom.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\n\nfunction Gameboard() {\n  const ships = [];\n  const missedShots = [];\n\n  function placeShip(length, startX, startY, orientation) {\n    const ship = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship)(length); // Create a new ship with the given length\n    let coordinates = []; //Initialize coordinates array\n\n    for (let i = 0; i < length; i++) {\n      //Set coordinates based on orientation\n      let x = startX + (orientation === \"horizontal\" ? i : 0);\n      let y = startY + (orientation === \"vertical\" ? i : 0);\n      coordinates.push({ x, y, ship, hit: false });\n    }\n\n    ships.push(...coordinates); //Push the ship & its coordinates to the ships array\n  }\n\n  function receiveAttack(x, y) { // Returns true or false depending on if ship gets hit\n    console.log(`Attacking coordinates: (${x}, ${y})`);\n    const hitShip = ships.find((coord) => coord.x === x && coord.y === y);\n    if (hitShip) {\n      hitShip.ship.hit(); \n      console.log(`Hit at: (${x}, ${y})`);\n      return true; // Hit\n    } else {\n      missedShots.push({ x, y });\n      console.log(`Miss at: (${x}, ${y})`);\n      return false; // Miss\n    }\n  }\n\n  \n  function allShipsSunk() {\n    const uniqueShips = new Set(ships.map((coord) => coord.ship));\n    return Array.from(uniqueShips).every((ship) => ship.isSunk());\n  }\n\n  function isShipAt(x, y) {\n    // Checks for & returns true if any ship has a part at (x, y)\n      return ships.some(coord => coord.x === x && coord.y === y);\n  }\n\n  function isHitAt(x, y) {\n    const shipBox = ships.find((coord) => coord.x === x && coord.y === y); // Find the ship segment at the specified coordinates\n    if (shipBox) {\n      shipBox.ship.hit(); // Mark the ship as hit\n      return true; // Return true if the segment exists and is hit\n    }\n    return false; \n  } \n\n  function isMissAt(x, y) {\n    return missedShots.some((shot) => shot.x === x && shot.y === y); // Returns true if a coordinate is a missed shot\n  }\n\n  return {\n    placeShip,\n    receiveAttack,\n    allShipsSunk,\n    isShipAt,\n    isHitAt,\n    isMissAt,\n  };\n}\n\n\n\n//# sourceURL=webpack://practice/./src/gameboard.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n\n\n// A player has his/her own game board, and an attack (player or cpu)\nfunction Player(type) {    \n  const gameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();\n\n  function attack(opponentGameboard, x, y) {\n    return opponentGameboard.receiveAttack(x, y);\n  }\n\n  function computerAttack(opponentGameboard) {\n    const x = Math.floor(Math.random() * 10);\n    const y = Math.floor(Math.random() * 10);\n    return opponentGameboard.receiveAttack(x, y);\n  }\n\n  return {\n    type,\n    gameboard,\n    attack: type === \"cpu\" ? computerAttack : attack,\n  };\n}\n\n\n\n//# sourceURL=webpack://practice/./src/player.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n\n\n\nconst game = (() => {\n  let player1;\n  let player2;\n  let currentPlayer;\n  let gameOver = false;\n\n  // Initialize a new game\n  function startGame() {\n    // Initialize 2 players\n    let type = \"human\";\n    player1 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.Player)(type);\n    player2 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.Player)(type);\n\n    currentPlayer = player1; // Set the first player as the current player\n\n    // Place ships for both players (using the Ship factory)\n    player1.gameboard.placeShip(3, 0, 0, \"horizontal\"); // Create a ship of length 3 at coordinates 0,0\n    player2.gameboard.placeShip(3, 5, 5, \"vertical\"); // CPU player places a ship\n\n    // Render the gameboards on the DOM\n    _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.renderGameboard(player1, \"player1-gameboard\");\n    _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.renderGameboard(player2, \"player2-gameboard\");\n\n    // Add event listener to current player gameboard\n    if (currentPlayer === player1) {\n      _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.addGameboardClickListener(\"player1-gameboard\", handleAttack);\n      _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.removeGameboardClickListener(\"player2-gameboard\");  \n    } else if (currentPlayer === player2) {\n      _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.addGameboardClickListener(\"player2-gameboard\", handleAttack);\n      _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.removeGameboardClickListener(\"player1-gameboard\");\n    }\n\n    console.log(\"Game Started\");\n  }\n\n  // Handle a player attack based on the coordinates clicked. Calls attack function for current player on opponent and re-renders opponent's board.\n  function handleAttack(x, y) {\n    if (gameOver) return;\n\n    // console.log('currentPlayer: ', currentPlayer);\n\n    if (currentPlayer === player1) {\n      const hit = player1.attack(player2.gameboard, x, y);\n      _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.renderGameboard(player2, \"player2-gameboard\"); // Re-render enemy board after the attack\n\n      if (player2.gameboard.allShipsSunk()) {\n        alert(\"Player 1 wins!\");\n        return;\n      }\n\n      currentPlayer = player2; // Switch to player 2 and enable correcto board\n      _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.addGameboardClickListener(\"player2-gameboard\", handleAttack);\n      _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.removeGameboardClickListener(\"player1-gameboard\");\n      console.log(`player 2's turn!`);\n\n    } else if (currentPlayer === player2) {\n      const hit = player2.attack(player1.gameboard, x, y);\n      _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.renderGameboard(player1, \"player1-gameboard\"); // Re-render enemy board after the attack\n\n      if (player1.gameboard.allShipsSunk()) {\n        alert(\"Player 2 wins!\");\n        return;\n      }\n      currentPlayer = player2; // Switch to player 1 and enable correcto board\n      _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.addGameboardClickListener(\"player1-gameboard\", handleAttack);\n      _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.removeGameboardClickListener(\"player2-gameboard\");\n      currentPlayer = player1;\n      console.log(`player 1's turn!`);\n    }\n  }\n\n  // Computer’s turn to attack\n  function computerTurn() {\n    if (gameOver) return;\n\n    player2.attack(player1.gameboard);\n\n    _dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.renderGameboard(player1, \"player-gameboard\");\n\n    if (player1.gameboard.allShipsSunk()) {\n      gameOver = true;\n      alert(\"Computer wins!\");\n      return;\n    }\n\n    currentPlayer = player1; // Switch back to player 1\n    console.log(`player 1's turn!`);\n\n  }\n\n  return {\n    startGame,\n  };\n})();\n\ngame.startGame();\n\n\n//# sourceURL=webpack://practice/./src/script.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nfunction Ship(length) {\n  let hits = 0;\n\n  function hit() {\n    hits++;\n  }\n\n  function isSunk() {\n    return hits >= length;\n  }\n\n  return {\n    length,\n    hit,\n    isSunk,\n  };\n}\n\n\n\n//# sourceURL=webpack://practice/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script.js");
/******/ 	
/******/ })()
;