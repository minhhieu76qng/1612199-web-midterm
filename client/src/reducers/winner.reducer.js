import { SET_WINNER } from '../actions';

function winner(state = null, action) {
  switch (action.type) {
    case SET_WINNER:
      return action.winner;
    default:
      return state;
  }
}
export default winner;
