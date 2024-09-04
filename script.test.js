const { Ship, Gameboard } = require("./script");

test("places ships on the board correctly", () => {
  const board = Gameboard();
  const ship1 = Ship(3);
    
  board.placeShip(ship1, 0, 0, "horizontal");

  expect(board.receiveAttack(0, 0)).toBe(true);
  expect(board.receiveAttack(1, 0)).toBe(true);
  expect(board.receiveAttack(2, 0)).toBe(true);
  expect(board.receiveAttack(3, 0)).toBe(false);
});

test("tracks missed shots", () => {
  const board = Gameboard();
  board.receiveAttack(5, 5);
  expect(board.getMissedShots()).toEqual([{ x: 5, y: 5 }]);
});

test("reports when all ships are sunk", () => {
  const board = Gameboard();
  const ship = Ship(2);
  board.placeShip(ship, 0, 0, "horizontal");

  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);

  expect(board.allShipsSunk()).toBe(true);
});
