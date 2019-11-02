import { size } from '../constants/constants';
// import boardChecking from './boardChecking';

export const generatePosition = board => {
  let row = null;
  let col = null;
  do {
    row = Math.floor(Math.random() * size);
    col = Math.floor(Math.random() * size);
  } while (!(row < size && col < size && board[row][col] === null));

  return { row, col };
};

export const test = () => {};
