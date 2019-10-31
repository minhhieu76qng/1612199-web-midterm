import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import turn from './turn.reducer';
import winner from './winner.reducer';
import historyReducer from './history.reducer';
import register from './register.reducer';
import account from './account.reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    xIsNext: turn,
    winner,
    historyReducer,
    register,
    account
  });
