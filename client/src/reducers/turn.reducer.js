import { SET_TURN } from '../actions';

function xIsNext(state = true, action) {
  switch (action.type) {
    case SET_TURN:
      return action.turn;
    default:
      return state;
  }
}

export default xIsNext;
