import React from 'react';
import uuidv1 from 'uuid/v1';
import Line from './Line';
import CellContainer from '../../containers/CellContainer';

const Board = ({ board, winner, listPoints }) => {
  const renderBoard = () => {
    return board.map((row, iRow) => {
      return (
        <div key={uuidv1()} className='board-row'>
          {row.map((cell, iCol) => {
            return (
              <CellContainer
                key={uuidv1()}
                row={iRow}
                col={iCol}
                val={cell}
                stop={winner !== null}
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

export default Board;
