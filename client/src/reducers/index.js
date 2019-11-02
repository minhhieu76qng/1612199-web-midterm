import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import turn from './turn.reducer';
import winner from './winner.reducer';
import history from './history.reducer';
import register from './register.reducer';
import account from './account.reducer';

export default historyRoute =>
  combineReducers({
    router: connectRouter(historyRoute),
    xIsNext: turn,
    winner,
    history,
    register,
    account
  });
