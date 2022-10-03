import React, { useEffect, useState } from 'react';
import Square from '../Square/Square';
import { ConvertCoordinateToNumber } from '../../util/CalculateWinner';

const Board = ({ squares, onClick, row, col, selectedSquare, winingLine }) => {
  const [board, setBoard] = useState([]);
  // const [prevSquare, setPrevSquare] = useState(null);

  useEffect(() => {
    let board = [];
    let rowArray = [];
    for (let rowCount = 0; rowCount < row; rowCount++) {
      for (let colCount = 0; colCount < col; colCount++) {
        rowArray.push(colCount);
      }
      board.push(rowArray);
      rowArray = [];
    }
    setBoard(board);
  }, [col, row]);

  const renderSquare = (i, colorType) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        colorType={colorType}
      />
    );
  };

  return (
    <div>
      {board.map((row, indexRow) => (
        <div key={indexRow} className="board-row">
          {row.map((square, indexSquare, arraySquare) => {
            let index = ConvertCoordinateToNumber(
              indexRow,
              arraySquare.length,
              indexSquare
            );
            if (winingLine !== undefined && winingLine !== null) {
              if (winingLine.includes(index)) {
                return renderSquare(index, 1);
              }
            } else if (index === selectedSquare) {
              return renderSquare(index, 0);
            }
            return renderSquare(index, 2);
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
