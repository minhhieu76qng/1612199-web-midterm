import React from 'react';

const Cell = ({ row, col, val, mark, xIsNext, stop }) => {
  let player = '';
  if (val !== null) {
    player = val === 1 ? ' X' : ' O';
  }

  const handleClick = () => {
    if (!stop) {
      mark(row, col, xIsNext ? 1 : 0);
    }
  };

  return (
    <button
      id={`cell-${row}-${col}`}
      type='button'
      className={`board-cell player${player}`}
      onClick={handleClick}
    >
      {player}
    </button>
  );
};

Cell.defaultProps = {
  val: null
};

export default Cell;
