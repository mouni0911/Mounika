import React, { useState } from "react";
import "./Tictactoe.css";

const Tictactoe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setisXTurn] = useState(true);
  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return false;
  };
  const isWinner = checkWinner();
  const isDraw = board.every((cell) => cell !== "");
  const click = (n) => {
    let square = [...board];
    if (board[n] !== "") {
      return;
    }
    square[n] = isXTurn;
    setBoard(square);
    if (isXTurn === "x") {
      setisXTurn("o");
    } else {
      setisXTurn("x");
    }
  };
  const handleReset = () => {
    setBoard(Array(9).fill(""));
  };
  return (
    <div>
      <h1>TICTACTOE</h1>
      {isWinner ? (
        <h1 style={{ color: "white", fontSize: "38px", marginTop: "12%" }}>
          {" "}
          {isWinner} won the game
          <button
            style={{
              marginLeft: "1%",
              padding: "5px",
              fontSize: "20px",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={handleReset}
          >
            Play Again
          </button>
        </h1>
      ) : isDraw ? (
        <h1 style={{ color: "white", fontSize: "38px", marginTop: "12%" }}>
          {" "}
          It's a Draw
          <button
            style={{
              marginLeft: "1%",
              padding: "5px",
              fontSize: "20px",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={handleReset}
          >
            Play Again
          </button>
        </h1>
      ) : (
        <>
          {/* { <h2>Player {isXTurn ? "x" : "o"} please move </h2> } */}
          <table>
            <tbody>
              <tr>
                <td onClick={() => click(0)}>{board[0]}</td>
                <td onClick={() => click(1)}>{board[1]}</td>
                <td onClick={() => click(2)}>{board[2]}</td>
              </tr>
              <tr>
                <td onClick={() => click(3)}>{board[3]}</td>
                <td onClick={() => click(4)}>{board[4]}</td>
                <td onClick={() => click(5)}>{board[5]}</td>
              </tr>
              <tr>
                <td onClick={() => click(6)}>{board[6]}</td>
                <td onClick={() => click(7)}>{board[7]}</td>
                <td onClick={() => click(8)}>{board[8]}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={handleReset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Tictactoe;
