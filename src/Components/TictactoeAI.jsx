import React, { useState, useEffect, useCallback } from "react";
import "./TictactoeAI.css";

const TictactoeAI = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = useState(true);

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  const checkWinner = (squares) => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFull = (squares) => {
    return squares.every((cell) => cell !== null);
  };

  const calculateWinner = checkWinner(board);
  const isDraw = isBoardFull(board) && !calculateWinner;

  const makeMove = useCallback(
    (index, symbol) => {
      const newBoard = [...board];
      newBoard[index] = symbol;
      setBoard(newBoard);
    },
    [board]
  );

  useEffect(() => {
    if (!isPlayerX && !calculateWinner && !isDraw) {
      // AI's turn
      const aiMove = calculateRandomMove(board);
      makeMove(aiMove, "O");
      setIsPlayerX(true);
    }
  }, [isPlayerX, board, calculateWinner, isDraw, makeMove]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner || isDraw) {
      return;
    }

    makeMove(index, isPlayerX ? "X" : "O");
    setIsPlayerX(!isPlayerX);
  };

  const calculateRandomMove = (squares) => {
    const availableMoves = squares.reduce((acc, cell, index) => {
      if (!cell) {
        acc.push(index);
      }
      return acc;
    }, []);

    const randomMove =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    return randomMove;
  };
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerX(true);
  };

  return (
    <div className="tictactoe">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {calculateWinner && <p>Winner: {calculateWinner}</p>}
      {isDraw && <p>It's a draw!</p>}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default TictactoeAI;
