import { connect } from 'react-redux';
import Game from '../components/game/Game';
import { resetGame, jumpTo, mark } from '../actions/game';

const mapStateToProps = state => ({
  xIsNext: state.game.xIsNext,
  list: state.game.list,
  step: state.game.step
});

const mapDispatchToProps = dispatch => ({
  resetGame: () => dispatch(resetGame()),
  jumpTo: step => {
    dispatch(jumpTo(step));
  },
  mark: (row, col, player) => {
    dispatch(mark(row, col, player));
  }
});

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;
