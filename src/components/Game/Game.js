import React, { useState } from 'react';
import { calculateWinner } from '../../util/CalculateWinner';
import Board from '../Board/Board';

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      currentCoordinate: '',
      currentPlayer: true,
      currentSelected: null,
      winning: [],
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [row, setRow] = useState('');
  const [col, setCol] = useState('');
  const [isDes, setIsDes] = useState(true);
  const [isDisplayGame, setIsDisplayGame] = useState(false);

  const current = history[stepNumber];
  const [winner, winingLine] = calculateWinner(
    current.squares,
    col,
    row,
    current.currentSelected,
    current.currentCoordinate,
    current.currentPlayer
  );
  let moves;
  if (isDes) {
    moves = history.map((step, move) => {
      const desc = move
        ? `Go to move # ${move}, player ${
            step.currentPlayer ? 'X' : 'O'
          } chooses {${step.currentCoordinate.x},${step.currentCoordinate.y}}`
        : 'Go to game start';
      return (
        <li key={move}>
          <button style={{ width: '350px' }} onClick={() => jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
  } else {
    let reverseHistory = history.slice(0).reverse();
    moves = reverseHistory.map((step, move, array) => {
      const desc =
        move !== array.length - 1
          ? `Go to move # ${array.length - move - 1}, player ${
              step.currentPlayer ? 'X' : 'O'
            } chooses {${step.currentCoordinate.x},${step.currentCoordinate.y}}`
          : 'Go to game start';
      return (
        <li key={move}>
          <button
            style={{ width: '350px' }}
            onClick={() => jumpTo(array.length - move - 1)}
          >
            {desc}
          </button>
        </li>
      );
    });
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const checkOccurrence = (array, element) => {
    let counter = 0;
    for (let item of array.flat()) {
      if (item === element) {
        counter++;
      }
    }
    return counter;
  };

  const handleClick = (i) => {
    const _history = history.slice(0, stepNumber + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    const [isWining, winingLine] = calculateWinner(
      current.squares,
      col,
      row,
      current.currentSelected,
      current.currentCoordinate,
      current.currentPlayer
    );

    if (isWining || squares[i]) {
      let winner = {
        ..._history[_history.length - 1],
        winning: winingLine,
      };
      setHistory([..._history.slice(0, -1), winner]);
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      _history.concat([
        {
          squares: squares,
          currentCoordinate: { x: Math.floor(i / col), y: i % col },
          currentPlayer: xIsNext,
          currentSelected: i,
        },
      ])
    );
    setStepNumber(_history.length);
    setXIsNext(!xIsNext);

    if (checkOccurrence(squares, null) === 0) {
      alert('DRAWWWWWWW!');
      return;
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const handleApplyClick = (_col, _row) => {
    if (_col < 5 || _row < 5) {
      alert('Column and row count must be >= 5, try again ( ･ั﹏･ั)');
      return;
    }
    if (_col > 30) {
      alert('Column count should be less than or equal 30, please ( ･ั﹏･ั)');
      return;
    }
    setCol(_col);
    setRow(_row);
    setHistory([
      {
        squares: Array(_col * _row).fill(null),
        currentCoordinate: '',
        currentPlayer: true,
        currentSelected: null,
        winning: [],
      },
    ]);
    setStepNumber(0);
    setXIsNext(true);
    setIsDes(true);
    setIsDisplayGame(true);
  };

  const handleAscending = () => {
    setIsDes(false);
  };

  const handleDescending = () => {
    setIsDes(true);
  };

  const handleReset = (_col, _row) => {
    _col.value = null;
    _row.value = null;
    setHistory([
      {
        squares: Array(9).fill(null),
        currentCoordinate: '',
        currentPlayer: true,
        currentSelected: null,
        winning: [],
      },
    ]);
    setStepNumber(0);
    setCol('');
    setRow('');
    setXIsNext(true);
    setIsDes(true);
    setIsDisplayGame(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="inputSize">
        <div className="labelInput">Input Column:</div>
        <div className="labelInput" style={{ color: 'red' }}>
          (recommended is 30)
        </div>
        <input id="col" type="number" />
        <br />
        <br />
        <div className="labelInput">Input Row:</div>
        <input id="row" type="number" />
        <br />
        <button
          onClick={() =>
            handleApplyClick(
              document.getElementById('col').value,
              document.getElementById('row').value
            )
          }
          style={{ marginTop: '10px', marginRight: '20px' }}
        >
          Apply
        </button>
        <button
          onClick={() =>
            handleReset(
              document.getElementById('col'),
              document.getElementById('row')
            )
          }
        >
          Reset
        </button>
      </div>
      <div className="game" style={{ display: isDisplayGame ? '' : 'none' }}>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => handleClick(i)}
            col={col}
            row={row}
            selectedSquare={current.currentSelected}
            winingLine={winingLine}
          />
        </div>
        <div className="game-info">
          {winner ? (
            <div className="title" style={{ fontSize: '50px' }}>
              {status}
            </div>
          ) : (
            <div style={{ fontSize: '50px', fontWeight: '500' }}>{status}</div>
          )}
          <br />
          <br />
          <br />
          <div className="sortOrder">
            <button onClick={handleAscending}>Ascending</button>
            <button onClick={handleDescending}>Descending</button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
};

export default Game;
