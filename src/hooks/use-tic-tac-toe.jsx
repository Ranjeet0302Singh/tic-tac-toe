import { useState } from "react";
const initialBoard = () => {
  return Array(9).fill(null);
};
const useTicTacToe = () => {
  const [board, setBoard] = useState(initialBoard());
  const [isXNext, setIsXNext] = useState(true);
const generateWinningPattern = () => {
    const winningPattern = [];
    const size = Math.sqrt(board.length);

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(i * size + j);
        }
        winningPattern.push(row);
    }

    for (let i = 0; i < size; i++) {
        const column = [];
        for (let j = 0; j < size; j++) {
            column.push(j * size + i);
        }
        winningPattern.push(column);
    }

    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < size; i++) {
        diagonal1.push(i * size + i);
        diagonal2.push(i * size + (size - 1 - i));
    }
    winningPattern.push(diagonal1);
    winningPattern.push(diagonal2);

    return winningPattern;
};

const winningPattern = generateWinningPattern();
  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < winningPattern.length; i++) {
      const [a, b, c] = winningPattern[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };
  const handleClick = (index) => {
    const winner = calculateWinner(board);
    console.log(winner);
    if (winner || board[index]) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };
  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Next player: ${isXNext ? "X" : "O"}`;
  };
  const resetGame = () => {
    setBoard(initialBoard());
    setIsXNext(true);
  };

  return { board, handleClick, calculateWinner, getStatusMessage, resetGame };
};

export default useTicTacToe;
