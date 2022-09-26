import React, { Component } from 'react';
import Board from './Board';
import { calculateWinner } from '../util/CalculateWinner';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          currentCoordinate: '',
          currentPlayer: true,
          currentSelected: null,
          winning: [],
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      row: '',
      col: '',
      isDes: true,
    };
  }
  checkOccurrence = (array, element) => {
    let counter = 0;
    for (let item of array.flat()) {
      if (item === element) {
        counter++;
      }
    }
    return counter;
  };
  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const [isWining, winingLine] = calculateWinner(
      current.squares,
      this.state.col,
      this.state.row,
      current.currentSelected,
      current.currentCoordinate,
      current.currentPlayer
    );

    if (isWining || squares[i]) {
      let winner = { ...history[history.length - 1], winning: winingLine };
      this.setState({
        history: [...history.slice(0, -1), winner],
      });
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    let col = this.state.col;
    this.setState({
      history: history.concat([
        {
          squares: squares,
          currentCoordinate: { x: Math.floor(i / col), y: i % col },
          currentPlayer: this.state.xIsNext,
          currentSelected: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    if (this.checkOccurrence(squares, null) === 0) {
      alert('DRAWWWWWWW!');
      return;
    }
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  handleApplyClick = (col, row) => {
    if (col < 5 || row < 5) {
      alert('Column and row count must be >= 5, try again');
      return;
    }
    this.setState({
      col,
      row,
      history: [
        {
          squares: Array(col * row).fill(null),
        },
      ],
    });
  };

  handleAscending = () => {
    this.setState({ isDes: false });
  };

  handleDescending = () => {
    this.setState({ isDes: true });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const col = this.state.col;
    const row = this.state.row;
    const [winner, winingLine] = calculateWinner(
      current.squares,
      col,
      row,
      current.currentSelected,
      current.currentCoordinate,
      current.currentPlayer
    );
    const isDes = this.state.isDes;
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
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
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
              } chooses {${step.currentCoordinate.x},${
                step.currentCoordinate.y
              }}`
            : 'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(array.length - move - 1)}>
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
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <>
        <div className="inputSize">
          <div>Input Col:</div>
          <input id="col" type="number" />
          <div>Input Row:</div>
          <input id="row" type="number" />
          <br />
          <button
            onClick={() =>
              this.handleApplyClick(
                document.getElementById('col').value,
                document.getElementById('row').value
              )
            }
            style={{ marginTop: '10px' }}
          >
            Apply
          </button>
        </div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              col={this.state.col}
              row={this.state.row}
              selectedSquare={current.currentSelected}
              winingLine={winingLine}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <br />
            <br />
            <br />
            <div className="sortOrder">
              <button onClick={this.handleAscending}>Ascending</button>
              <button onClick={this.handleDescending}>Descending</button>
            </div>
            <ol>{moves}</ol>
          </div>
        </div>
      </>
    );
  }
}
