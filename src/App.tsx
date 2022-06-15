import React, {useEffect, useState} from 'react';
import './App.css';
import {Board} from "./models/Board";
import BoardComponent from './components/BoardComponent'
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFiguresComponent from "./components/LostFiguresComponent";
import TimerComponent from "./components/TimerComponent";

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPLayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }
  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer);
  }

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  return (
    <div className='app'>
      <TimerComponent
      currentPlayer={currentPlayer}
      restart={restart}
      />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFiguresComponent
          title={'Black Figures'}
          figures={board.lostBlackFigures}
        />

        <LostFiguresComponent
          title={'White Figures'}
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
};

export default App;
