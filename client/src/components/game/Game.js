import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal } from 'antd';
import { Prompt } from 'react-router-dom';
import { isFull, isTerminated } from '../../algorithms/boardChecking';
import Board from './Board';
import History from './History';
import { generatePosition } from '../../algorithms/AI';

const Game = ({ xIsNext, list, step, jumpTo, resetGame, mark }) => {
  document.title = 'Play with bot';

  const [open, setOpen] = useState(false);
  const [sortASC, setSort] = useState(true);

  const { board } = list[step];
  const { lastPosition } = list[step];

  //  check xem game win hay chua
  let points = [];
  let hasWinner;
  let winner = null;
  if (lastPosition) {
    const checkingResult = isTerminated(board, lastPosition.x, lastPosition.y);
    points = checkingResult.listPoints;
    hasWinner = checkingResult.hasWinner;

    if (hasWinner) {
      winner = board[lastPosition.x][lastPosition.y];
    }
  }

  const showPlayer = () => {
    let strPlayer = '';
    let status = '';
    if (winner !== null) {
      strPlayer = winner === 1 ? 'X' : 'O';
      status = 'Winner';
    } else {
      status = 'Player';
      if (isFull(board)) {
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

  const showConfirm = () => {
    Modal.confirm({
      title: 'Reset game',
      content: 'Do you want to reset this game?',
      okText: 'Yes',
      cancelTextokText: 'No',
      onOk() {
        resetGame();
        setOpen(false);
      },
      onCancel() {
        setOpen(false);
      }
    });
  };

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (!xIsNext && !hasWinner) {
      const pos = generatePosition(board);
      mark(pos.row, pos.col, 0);
    }
  });

  return (
    <div className='game-wrapper' style={{ flexGrow: 1 }}>
      <Prompt message='Are you sure you want to leave?' />
      <Row type='flex' justify='space-between'>
        <Col xs={24} md={16}>
          <Row type='flex' justify='center' align='top'>
            <Col>
              <Board listPoints={points} board={board} winner={winner} />
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
            history={list}
            sort={sortASC}
            toggleSort={() => setSort(!sortASC)}
            jumpTo={jumpTo}
            selected={step}
          />
        </Col>
      </Row>

      {open && showConfirm()}
    </div>
  );
};

export default Game;
