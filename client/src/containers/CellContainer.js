import { connect } from 'react-redux';
import Cell from '../components/game/Cell';
import { mark } from '../actions/game';

const mapStateToProps = state => {
  return {
    xIsNext: state.game.xIsNext
  };
};
const mapDispatchToProps = dispatch => {
  return {
    mark: (row, col, player) => {
      dispatch(mark(row, col, player));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell);
