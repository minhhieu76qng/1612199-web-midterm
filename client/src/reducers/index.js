import { combineReducers } from 'redux';
import turn from './turn.reducer';
import winner from './winner.reducer';
import history from './history.reducer';
import register from './register.reducer';
import login from './login.reducer';
import account from './account.reducer';

export default combineReducers({
  xIsNext: turn,
  winner,
  history,
  register,
  login,
  account
});
