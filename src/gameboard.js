import { Ship } from "./ship.js";

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
      coordinates.push({ x, y, ship, hit: false });
    }

    ships.push(...coordinates); //Push the ship & its coordinates to the ships array
  }

  function receiveAttack(x, y) { // Returns true or false depending on if ship gets hit
    console.log(`Attacking coordinates: (${x}, ${y})`);
    const hitShip = ships.find((coord) => coord.x === x && coord.y === y);
    if (hitShip) {
      hitShip.ship.hit(); 
      console.log(`Hit at: (${x}, ${y})`);
      return true; // Hit
    } else {
      missedShots.push({ x, y });
      console.log(`Miss at: (${x}, ${y})`);
      return false; // Miss
    }
  }

  
  function allShipsSunk() {
    const uniqueShips = new Set(ships.map((coord) => coord.ship));
    return Array.from(uniqueShips).every((ship) => ship.isSunk());
  }

  function isShipAt(x, y) {
    // Checks for & returns true if any ship has a part at (x, y)
      return ships.some(coord => coord.x === x && coord.y === y);
  }

  function isHitAt(x, y) {
    const shipBox = ships.find((coord) => coord.x === x && coord.y === y); // Find the ship segment at the specified coordinates
    if (shipBox) {
      shipBox.ship.hit(); // Mark the ship as hit
      return true; // Return true if the segment exists and is hit
    }
    return false; 
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

export { Gameboard };