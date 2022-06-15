import {Colors} from "./Colors";
import {Figure} from "./figures/Figure";
import {Board} from "./Board";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number; // for react key

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null,
  ) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.figure = figure;
    this.color = color;
    this.available = false;
    this.id = Math.random();
  }

  isEmpty = (): boolean => {
    return this.figure === null;
  }

  isEnemy = (target: Cell): boolean => {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }

    return false;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }

    const minY = Math.min(this.y, target.y);
    const maxY = Math.max(this.y, target.y);
    for (let y = minY + 1; y < maxY; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }

    return true;
  }

  isEmptyHorizontal = (target: Cell): boolean => {
   if (this.y !== target.y) {
     return false;
   }

   const minX = Math.min(this.x, target.x);
   const maxX = Math.max(this.x, target.x);
    for (let x = minX + 1; x < maxX; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }

    return true;
  }

  isEmptyDiagonal = (target: Cell): boolean => {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absX !== absY) {
      return false;
    }

    const dx = this.x < target.x ? 1 : -1;
    const dy = this.y < target.y ? 1 : -1;
    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }

    return true;
  }

  setFigure = (figure: Figure) => {
    this.figure = figure;
    this.figure.cell = this;
  }

  addLostFigure = (figure: Figure) => {
    figure.color === Colors.WHITE ?
      this.board.lostWhiteFigures.push(figure) :
      this.board.lostBlackFigures.push(figure)
  }

  moveFigure = (target: Cell) => {
    if (this.figure && this.figure.canMove(target)) {
      this.figure.moveFigure(target);

      if (target.figure) {
        this.addLostFigure(target.figure);
      }

      target.setFigure(this.figure);
      this.figure = null;
    }
  }
}
