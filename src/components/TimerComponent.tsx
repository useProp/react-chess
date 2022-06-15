import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerComponentProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const TimerComponent: FC<TimerComponentProps> = ({ currentPlayer, restart }) => {
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  const decrementWhiteTimer = () => setWhiteTime(prev => prev - 1);

  const decrementBlackTimer = () => setBlackTime(prev => prev - 1);

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  return (
    <div>
      <button onClick={handleRestart}>Restart Game</button>
      <h2>Black Time - {blackTime}</h2>
      <h2>White Time - {whiteTime}</h2>
    </div>
  );
}

export default TimerComponent;
