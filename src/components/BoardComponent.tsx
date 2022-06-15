import React, {FC, Fragment, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  swapPlayer: () => void;
  currentPlayer: Player | null;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, swapPlayer, currentPlayer }) => {
  const [selectedCell, setSelectedSell] = useState<Cell | null>(null);

  const handleClick = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell?.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedSell(null);
    } else {
      if (cell?.figure?.color !== currentPlayer?.color) {
        return false;
      }
      setSelectedSell(cell);
    }
  };

  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell])

  return (
    <div>
      <h3>Current Player: {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) =>
          <Fragment key={index}>
            {row.map(cell =>
              <CellComponent
                handleClick={handleClick}
                key={cell.id}
                cell={cell}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default BoardComponent;
