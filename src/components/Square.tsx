import React, { useState, useEffect } from 'react'
import { TicTacToe } from '../types/TicTacToe';

interface SquareProps {
  key: number;
  index: number;
  ticTacToe: TicTacToe;
  setTTT: Function;
  setGameStatus: Function;
}

const Square = ({ key, index, ticTacToe, setTTT, setGameStatus }: SquareProps) => {
  const [symbol, setSymbol] = useState<"x" | "o" | null>(null);
  const [pressed, setPressed] = useState<boolean>(false);
  const squares: string[] = ["TL", "TC", "TR", "ML", "MC", "MR", "BL", "BC", "BR"];

  useEffect(() => {
    if(!ticTacToe.gameWon) {
      setSymbol(null);
      setPressed(false);
    }
  }, [ticTacToe.gameWon])

  const checkVictory = (ticTacToe: TicTacToe, moves: string[], turn: boolean) => {
    const winningSquares = ticTacToe.winningSquares;
    if (winningSquares.some(combo => combo.every(move => moves.includes(move)))) {
      setGameStatus(turn ? "X Wins!" : "O Wins!");
      setTTT({...ticTacToe, gameWon: true});
    } else if(ticTacToe.xSquares.length === 5) {
        setGameStatus("It's a tie!");
        setTTT({...ticTacToe, gameWon: true});
      }
    }

  const addSymbol = (ticTacToe: TicTacToe, index: number) => {
    const newTicTacToe = ticTacToe;
    if (newTicTacToe.xTurn) {
      setSymbol("x");
      newTicTacToe.xTurn = false;
      newTicTacToe.xSquares.push(squares[index]);
    } else {
      setSymbol("o");
      newTicTacToe.xTurn = true;
      newTicTacToe.oSquares.push(squares[index]);
    }
    setTTT(newTicTacToe);
    if(ticTacToe.xSquares.length >= 2) {
      !ticTacToe.xTurn ? checkVictory(ticTacToe, ticTacToe.xSquares, !ticTacToe.xTurn) : checkVictory(ticTacToe, ticTacToe.oSquares, !ticTacToe.xTurn);
    }
  }

  return (
    <div className={`square position-relative`} style={{borderTop: (index >= 3 ? "2px solid red" : ""), borderLeft: (index !== 0 && index !== 3 && index !== 6 ? "2px solid red" : "")}} onClick={() => {
      console.log(index)
      if (!pressed && !ticTacToe.gameWon) {
        addSymbol(ticTacToe, index);
        setPressed(true);
      }
    }}><div className="symbol position-absolute" style={{ top: "40%", left: "50%", transform: "translate(-50%, -50%)", color: symbol === "x" ? "red" : "blue", fontSize: "3rem"}}>{symbol}</div>
      </div>
  )
}

export default Square
