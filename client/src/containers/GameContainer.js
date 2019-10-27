import { connect } from 'react-redux';
import Game from '../components/game/Game';
import {
  setHistoryStep,
  setTurn,
  addHistoryItem,
  setWinner,
  emptyHistory
} from '../actions';

const mapStateToProps = state => ({
  board: state.board,
  xIsNext: state.xIsNext,
  winner: state.winner,
  history: state.history
});

const mapDispatchToProps = dispatch => ({
  setStep: step => dispatch(setHistoryStep(step)),
  setTurn: turn => dispatch(setTurn(turn)),
  addHistoryItem: historyItem => dispatch(addHistoryItem(historyItem)),
  setWinner: winner => dispatch(setWinner(winner)),
  emptyHistory: () => dispatch(emptyHistory())
});

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;
