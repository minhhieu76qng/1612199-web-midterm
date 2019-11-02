import { RESET_GAME, MARK, JUMP_TO } from '../actions/game';

const initialState = {
  xIsNext: true,
  list: [
    {
      board: new Array(20).fill(null).map(() => new Array(20).fill(null)),
      lastPosition: null
    }
  ],
  step: 0
};

function game(state = initialState, action) {
  let board = null;
  switch (action.type) {
    case RESET_GAME:
      return initialState;
    case MARK: // row, col, player
      // lấy ra board hiện tại.
      board = state.list[state.step].board.map(arr => [...arr]);

      if (board[action.row][action.col] === null) {
        board[action.row][action.col] = action.player;
        return {
          ...state,
          list: state.list
            .slice(0, state.step + 1)
            .concat([
              { board, lastPosition: { x: action.row, y: action.col } }
            ]),
          step: state.step + 1,
          xIsNext: !state.xIsNext
        };
      }
      return state;
    case JUMP_TO:
      return { ...state, step: action.step, xIsNext: action.step % 2 === 0 };
    default:
      return state;
  }
}

export default game;
