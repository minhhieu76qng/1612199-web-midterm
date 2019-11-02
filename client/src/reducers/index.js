import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import register from './register.reducer';
import account from './account.reducer';
import game from './withBot.reducer';

export default historyRoute =>
  combineReducers({
    router: connectRouter(historyRoute),
    register,
    account,
    game
  });
