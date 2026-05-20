/**
 * PEGA COR DO JOGADOR
 */
export function getPlayerColor(player, playerOne, playerTwo) {
  if (player === playerOne) return "red";
  if (player === playerTwo) return "yellow";
  return "";
}

/**
 * DEIXAR PEÇAS CAIR
 */
export function dropPieces(
  id,
  collumn,
  board,
  ROWS,
  COLUMNS,
  setCurrentPlayer,
  setWinner,
  setGameOver,
  gameOver,
  currentPlayer,
  setBoard,
  playerOne,
  playerTwo,
  finishGame,
) {
  if (gameOver) return;

  const newBoard = board.map((row) => [...row]);

  let placed = false;

  for (let row = ROWS - 1; row >= 0; row--) {
    if (!newBoard[row][collumn]) {
      newBoard[row][collumn] = currentPlayer;
      placed = true;
      break;
    }
  }

  // coluna cheia
  if (!placed) return;

  setBoard(newBoard);

  // vencedor
  if (checkWinner(newBoard, currentPlayer, ROWS, COLUMNS)) {
    setWinner(currentPlayer);
    setGameOver(true);
  finishGame(currentPlayer, id, currentPlayer === null);
    return;
  }

  // empate
  if (isBoardFull(newBoard)) {
    setGameOver(true);
    return;
  }

  // troca jogador
  const nextPlayer = currentPlayer === playerOne ? playerTwo : playerOne;

  setCurrentPlayer(nextPlayer);
}

/**
 * VERIFICAR VENCEDOR
 */
export function checkWinner(board, player, ROWS, COLUMNS) {
  // horizontal
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player
      ) {
        return true;
      }
    }
  }

  // vertical
  for (let col = 0; col < COLUMNS; col++) {
    for (let row = 0; row < ROWS - 3; row++) {
      if (
        board[row][col] === player &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player &&
        board[row + 3][col] === player
      ) {
        return true;
      }
    }
  }

  // diagonal ↘
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  // diagonal ↗
  for (let row = 3; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col + 1] === player &&
        board[row - 2][col + 2] === player &&
        board[row - 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  return false;
}

/**
 * TABULEIRO CHEIO
 */
export function isBoardFull(board) {
  return board.every((row) => row.every((cell) => cell));
}

/**
 * RESET GAME
 */
export function resetGame(
  setBoard,
  setCurrentPlayer,
  setGameOver,
  setWinner,
  createBoard,
  playerOne,
) {
  setBoard(createBoard());
  setCurrentPlayer(playerOne);
  setGameOver(false);
  setWinner(null);
}
