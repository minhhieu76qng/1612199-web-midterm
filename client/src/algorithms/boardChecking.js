import { numToWin, size } from '../constants/constants';

const checkingHorizontal = (board, row, col) => {
  let points = [];

  let isBlockOutAbove = false;
  let isBlockOutBelow = false;

  const curPlayer = board[row][col];

  // count = 1 la vi tri hien tai.
  let count = 1;
  points.push({ row, col });

  // dem ve 2 ben
  for (let i = col - 1; i >= 0; i -= 1) {
    if (board[row][i] === curPlayer) {
      count += 1;
      points.push({ row, col: i });
    } else {
      if (board[row][i] !== null) {
        isBlockOutAbove = true;
      }
      break;
    }
  }
  for (let i = col + 1; i < size; i += 1) {
    if (board[row][i] === curPlayer) {
      count += 1;
      points.push({ row, col: i });
    } else {
      if (board[row][i] !== null) {
        isBlockOutBelow = true;
      }
      break;
    }
  }

  if (count >= numToWin) {
    // sort
    points = points.sort((p1, p2) => {
      return (p1.row + 1) * size + p1.col <= (p2.row + 1) * size + p2.col
        ? -1
        : 1;
    });

    points.splice(1, points.length - 2);

    if (count > numToWin) {
      return {
        hasWinner: true,
        points
      };
    }
    return {
      hasWinner: !(isBlockOutAbove && isBlockOutBelow),
      points: !(isBlockOutAbove && isBlockOutBelow) ? points : []
    };
  }
  return {
    hasWinner: false,
    points: []
  };
};

const checkingVertical = (board, row, col) => {
  let points = [];
  let isBlockOutAbove = false;
  let isBlockOutBelow = false;

  const curPlayer = board[row][col];

  // count = 1 la vi tri hien tai.
  let count = 1;
  points.push({ row, col });

  // dem ve 2 ben
  for (let i = row - 1; i >= 0; i -= 1) {
    if (board[i][col] === curPlayer) {
      count += 1;
      points.push({ row: i, col });
    } else {
      if (board[i][col] !== null) {
        isBlockOutAbove = true;
      }
      break;
    }
  }
  for (let i = row + 1; i < size; i += 1) {
    if (board[i][col] === curPlayer) {
      count += 1;
      points.push({ row: i, col });
    } else {
      if (board[i][col] !== null) {
        isBlockOutBelow = true;
      }
      break;
    }
  }

  if (count >= numToWin) {
    // sort
    points = points.sort((p1, p2) => {
      return (p1.row + 1) * size + p1.col <= (p2.row + 1) * size + p2.col
        ? -1
        : 1;
    });

    points.splice(1, points.length - 2);

    if (count > numToWin) {
      return {
        hasWinner: true,
        points
      };
    }
    return {
      hasWinner: !(isBlockOutAbove && isBlockOutBelow),
      points: !(isBlockOutAbove && isBlockOutBelow) ? points : []
    };
  }
  return {
    hasWinner: false,
    points: []
  };
};

const checkingMainDiagonal = (board, row, col) => {
  let points = [];

  let isBlockOutAbove = false;
  let isBlockOutBelow = false;

  const curPlayer = board[row][col];
  // count = 1 la vi tri hien tai.
  let count = 1;
  points.push({ row, col });

  // dem ve 2 ben
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i -= 1, j -= 1) {
    if (board[i][j] === curPlayer) {
      count += 1;
      points.push({ row: i, col: j });
    } else {
      if (board[i][j] !== null) {
        isBlockOutAbove = true;
      }
      break;
    }
  }

  for (let i = row + 1, j = col + 1; i < size && j < size; i += 1, j += 1) {
    if (board[i][j] === curPlayer) {
      count += 1;
      points.push({ row: i, col: j });
    } else {
      if (board[i][j] !== null) {
        isBlockOutBelow = true;
      }
      break;
    }
  }

  if (count >= numToWin) {
    // sort
    points = points.sort((p1, p2) => {
      return (p1.row + 1) * size + p1.col <= (p2.row + 1) * size + p2.col
        ? -1
        : 1;
    });

    points.splice(1, points.length - 2);

    if (count > numToWin) {
      return {
        hasWinner: true,
        points
      };
    }
    return {
      hasWinner: !(isBlockOutAbove && isBlockOutBelow),
      points: !(isBlockOutAbove && isBlockOutBelow) ? points : []
    };
  }
  return {
    hasWinner: false,
    points: []
  };
};

const checkingSubDiagonal = (board, row, col) => {
  let points = [];

  let isBlockOutAbove = false;
  let isBlockOutBelow = false;

  const curPlayer = board[row][col];
  // count = 1 la vi tri hien tai.
  let count = 1;
  points.push({ row, col });

  // dem ve 2 ben
  for (let i = row - 1, j = col + 1; i >= 0 && j < size; i -= 1, j += 1) {
    if (board[i][j] === curPlayer) {
      count += 1;
      points.push({ row: i, col: j });
    } else {
      if (board[i][j] !== null) {
        isBlockOutAbove = true;
      }
      break;
    }
  }

  for (let i = row + 1, j = col - 1; i < size && j >= 0; i += 1, j -= 1) {
    if (board[i][j] === curPlayer) {
      count += 1;
      points.push({ row: i, col: j });
    } else {
      if (board[i][j] !== null) {
        isBlockOutBelow = true;
      }
      break;
    }
  }

  if (count >= numToWin) {
    // sort
    points = points.sort((p1, p2) => {
      return (p1.row + 1) * size + p1.col <= (p2.row + 1) * size + p2.col
        ? -1
        : 1;
    });

    points.splice(1, points.length - 2);

    if (count > numToWin) {
      return {
        hasWinner: true,
        points
      };
    }
    return {
      hasWinner: !(isBlockOutAbove && isBlockOutBelow),
      points: !(isBlockOutAbove && isBlockOutBelow) ? points : []
    };
  }
  return {
    hasWinner: false,
    points: []
  };
};

export const isTerminated = (board, row, col) => {
  const retH = checkingHorizontal(board, row, col);
  const retV = checkingVertical(board, row, col);
  const retM = checkingMainDiagonal(board, row, col);
  const retS = checkingSubDiagonal(board, row, col);

  const listPoints = [];
  if (retH.points.length === 2) listPoints.push(retH.points);
  if (retV.points.length === 2) listPoints.push(retV.points);
  if (retM.points.length === 2) listPoints.push(retM.points);
  if (retS.points.length === 2) listPoints.push(retS.points);

  const ret = {
    hasWinner:
      retH.hasWinner || retV.hasWinner || retM.hasWinner || retS.hasWinner,
    listPoints
  };
  return ret;
};

export const isFull = board => {
  return board.every(row => {
    return row.every(cell => cell);
  });
};
