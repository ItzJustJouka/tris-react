import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Square from './components/Square';
import { TicTacToe } from './types/TicTacToe';

function App() {
  const [gameStatus, setGameStatus] = useState<string>("");;
  const [ticTacToe, setTicTacToe] = useState<TicTacToe>({
    winningSquares: [
      //Rows
      ["TL", "TC", "TR"],
      ["ML", "MC", "MR"],
      ["BL", "BC", "BR"],
      //Columns
      ["TL", "ML", "BL"],
      ["TC", "MC", "BC"],
      ["TR", "MR", "BR"],
      //Diagonals
      ["TL", "MC", "BR"],
      ["TR", "MC", "BL"],
    ],
    xSquares: [],
    oSquares: [],
    xTurn: true,
    gameWon: true
  });
  
  const resetGame = (ticTacToe: TicTacToe) => {
    setTicTacToe({...ticTacToe, xSquares: [], oSquares: [], xTurn: true, gameWon: false});
    setGameStatus("");
  }
  return (
   <div className="wrapper d-flex flex-column justify-content-center">
      <h1 className='text-center mb-3 title'>Let's Play Tic-Tac-Toe</h1>
        <div className='game-container d-flex flex-row justify-content-center align-items-center'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="d-flex flex-column align-items-center">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Square key={j} index={j * 3 + i} ticTacToe={ticTacToe} setTTT={setTicTacToe} setGameStatus={setGameStatus}/>
                ))}
              </div>
            ))}
        </div>
        <h3 className="d-block text-center mt-3 mb-3">{gameStatus}</h3>
        <button className={`btn btn-primary mx-auto mt-3 ${ticTacToe.gameWon ? '' : 'd-none'}`} onClick={() => resetGame(ticTacToe)}>Play Game</button>
   </div>
  );
}

export default App;
