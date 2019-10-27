import React from 'react';
import uuidv1 from 'uuid/v1';
import Cell from './Cell';
import Line from './Line';

const Board = ({ board, onClick, winner, listPoints }) => {
  const renderBoard = () => {
    return board.map((row, iRow) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div key={iRow} className='board-row'>
          {row.map((cell, iCol) => {
            return (
              <Cell
                // eslint-disable-next-line react/no-array-index-key
                key={uuidv1()}
                row={iRow}
                col={iCol}
                val={cell}
                onClick={onClick}
                winner={winner}
              />
            );
          })}
        </div>
      );
    });
  };

  const renderLines = () =>
    listPoints.map(el => {
      const pStart = el[0];
      const pEnd = el[1];

      const cellStart = document.querySelector(
        `#cell-${pStart.row}-${pStart.col}`
      );

      const cellEnd = document.querySelector(`#cell-${pEnd.row}-${pEnd.col}`);
      return (
        <Line
          key={uuidv1()}
          pointStart={{ x: cellStart.offsetLeft, y: cellStart.offsetTop }}
          pointEnd={{ x: cellEnd.offsetLeft, y: cellEnd.offsetTop }}
          cellWidth={cellEnd.offsetWidth}
          player={board[pStart.row][pStart.col]}
        />
      );
    });

  return (
    <div id='board'>
      {renderBoard()}
      <svg className='draw-lines'>{winner !== null && renderLines()}</svg>
    </div>
  );
};

Board.defaultProps = {
  size: 20,
  numToWin: 5
};

export default Board;
