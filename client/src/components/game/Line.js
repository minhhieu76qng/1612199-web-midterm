import React from 'react';

const Line = ({ pointStart, pointEnd, cellWidth, player }) => {
  const playerDisplay = player === 1 ? 'X' : 'O';

  let pStart = {};
  const pEnd = {};

  if (!pStart.x && pointStart.y === pointEnd.y) {
    pStart.x = pointStart.x;
    pEnd.x = pointEnd.x + cellWidth;

    pStart.y = pointStart.y + cellWidth / 2;
    pEnd.y = pointEnd.y + cellWidth / 2;
  }

  if (!pStart.x && pointStart.x === pointEnd.x) {
    pStart.y = pointStart.y;
    pEnd.y = pointEnd.y + cellWidth;

    pStart.x = pointStart.x + cellWidth / 2;
    pEnd.x = pointEnd.x + cellWidth / 2;
  }

  if (!pStart.x && pointEnd.x - pointStart.x === pointEnd.y - pointStart.y) {
    pStart = pointStart;

    pEnd.x = pointEnd.x + cellWidth;
    pEnd.y = pointEnd.y + cellWidth;
  }

  if (!pStart.x && pointEnd.x - pointStart.x === -(pointEnd.y - pointStart.y)) {
    pStart.x = pointStart.x + cellWidth;
    pStart.y = pointStart.y;

    pEnd.x = pointEnd.x;
    pEnd.y = pointEnd.y + cellWidth;
  }

  return (
    <path
      className={`line ${playerDisplay}`}
      d={`M${pStart.x} ${pStart.y} L${pEnd.x} ${pEnd.y}`}
    />
  );
};

export default Line;
