import React, { useState } from 'react';
// import { Card, Button, Confirm } from 'semantic-ui-react';
import { Row, Col, Card, Button, Modal } from 'antd';
import Board from './Board';
import History from './History';

const Game = ({
  xIsNext,
  winner,
  history,
  setStep,
  setTurn,
  addHistoryItem,
  setWinner,
  emptyHistory,
  size = 20,
  numToWin = 5
}) => {
  const [open, setOpen] = useState(false);
  const [sortASC, setSort] = useState(true);

  const boardDisplay = [...history.list[history.step].board];
  const listPointsDisplay = [...history.list[history.step].listPoints];

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

  const isTerminated = (board, row, col) => {
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

  const isFull = board => {
    return board.every(row => {
      return row.every(cell => cell);
    });
  };

  const showPlayer = () => {
    let strPlayer = '';
    let status = '';
    if (winner !== null) {
      strPlayer = winner === 1 ? 'X' : 'O';
      status = 'Winner';
    } else {
      status = 'Player';
      if (isFull(boardDisplay)) {
        strPlayer = 'DRAW';
      } else {
        strPlayer = xIsNext ? 'X' : 'O';
      }
    }

    return (
      <>
        {status}: &nbsp;
        <span className={`player${` ${strPlayer}`}`}>{strPlayer}</span>
      </>
    );
  };

  const handleClick = (row, col) => {
    // đọc lịch sử
    const { list, step } = history;
    const currentHistory = list.slice(0, step + 1);

    // clone 2d array
    const currentBoard = currentHistory[currentHistory.length - 1].board.map(
      arr => [...arr]
    );

    const player = xIsNext ? 1 : 0;
    if (winner !== null || currentBoard[row][col] !== null) return;
    currentBoard[row][col] = player;
    const result = isTerminated(currentBoard, row, col);

    addHistoryItem({
      board: currentBoard,
      lastPosition: { x: row, y: col },
      winner: result.hasWinner ? player : null,
      id: step + 1,
      listPoints: result.listPoints
    });

    setTurn(!xIsNext);
    setStep(currentHistory.length);
    setWinner(result.hasWinner ? player : null);
  };

  const jumpTo = newStep => {
    const { list } = history;
    setStep(newStep);
    setTurn(newStep % 2 === 0);
    setWinner(list[newStep].winner);
  };

  const resetGame = () => {
    emptyHistory();
    setTurn(true);
    setWinner(null);
    setOpen(false);
  };

  const showConfirm = () => {
    Modal.confirm({
      title: 'Reset game',
      content: 'Do you want to reset this game?',
      okText: 'Yes',
      cancelTextokText: 'No',
      onOk() {
        resetGame();
      },
      onCancel() {
        setOpen(false);
      }
    });
  };

  return (
    <div className='game-wrapper' style={{ flexGrow: 1 }}>
      <Row type='flex' justify='space-between'>
        <Col xs={24} md={12}>
          <Row type='flex' justify='center' align='top'>
            <Col>
              <Board
                listPoints={listPointsDisplay}
                board={boardDisplay}
                xIsNext={xIsNext}
                onClick={handleClick}
                winner={winner}
              />
            </Col>
          </Row>
        </Col>

        <Col xs={24} md={8}>
          <Card
            title='Game infomation'
            className='game-card game-info'
            size='small'
          >
            <p>{showPlayer()}</p>

            <Button type='primary' onClick={() => setOpen(true)}>
              Reset game
            </Button>
          </Card>
          <History
            history={history.list}
            sort={sortASC}
            toggleSort={() => setSort(!sortASC)}
            jumpTo={jumpTo}
            selected={history.step}
          />
        </Col>
      </Row>

      {open && showConfirm()}
    </div>
  );
};

export default Game;
