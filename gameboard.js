const Ship = require("./ship");

function Gameboard() {
  const ships = [];
  const missedShots = [];

  function placeShip(length, startX, startY, orientation) {
    const ship = Ship(length); // Create a new ship with the given length
    let coordinates = []; //Initialize coordinates array

    for (let i = 0; i < length; i++) {
      //Set coordinates based on orientation
      let x = startX + (orientation === "horizontal" ? i : 0);
      let y = startY + (orientation === "vertical" ? i : 0);
      coordinates.push({ x, y, ship });
    }

    ships.push(...coordinates); //Push the ship & its coordinates to the ships array
  }

  function receiveAttack(x, y) { // Returns true or false depending on if ship gets hit
    const hitShip = ships.find((coord) => coord.x === x && coord.y === y);
    if (hitShip) {
      hitShip.ship.hit();
      return true; // Hit
    } else {
      missedShots.push({ x, y });
      return false; // Miss
    }
  }

  function allShipsSunk() {
    return ships.every((coord) => coord.ship.isSunk()); // Returns true if all ships have sunk
  }

  function isShipAt(x, y) {
    return ships.some((coord) => coord.x === x && coord.y === y); // Returns true if ship is located at the given coordinates
  }

  function isHitAt(x, y) {
    return ships.some(
      (coord) => coord.x === x && coord.y === y && coord.ship.isSunk() === false // Returns true if ship is hit at the given cordinates but not yet sunk
    );
  }

  function isMissAt(x, y) {
    return missedShots.some((shot) => shot.x === x && shot.y === y); // Returns true if a coordinate is a missed shot
  }

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    isShipAt,
    isHitAt,
    isMissAt,
  };
}

module.exports = Gameboard;