import React from 'react';

const Cell = ({ row, col, val, onClick, winner }) => {
  let player = '';
  if (val !== null) {
    player = val === 1 ? ' X' : ' O';
  }

  let notClickable = ' not-clickable';

  if (!winner && val === null) {
    notClickable = '';
  }
  return (
    <button
      id={`cell-${row}-${col}`}
      type='button'
      className={`board-cell player${player + notClickable}`}
      onClick={() => onClick(row, col)}
    >
      {player}
    </button>
  );
};

Cell.defaultProps = {
  val: null
};

export default Cell;
