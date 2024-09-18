import { Gameboard } from "./gameboard.js";

// A player has his/her own game board, and an attack (player or cpu)
function Player(type) {    
  const gameboard = Gameboard();

  function attack(opponentGameboard, x, y) {
    return opponentGameboard.receiveAttack(x, y);
  }

  function computerAttack(opponentGameboard) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return opponentGameboard.receiveAttack(x, y);
  }

  return {
    type,
    gameboard,
    attack: type === "cpu" ? computerAttack : attack,
  };
}

export { Player };