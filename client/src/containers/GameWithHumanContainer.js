import { connect } from 'react-redux';
import GameWithHuman from '../components/game/GameWithHuman';
import { clearMatch } from '../actions/gameWithHuman';

const mapStateToProps = state => {
  return {
    roomID: state.gameWithHuman.roomID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearMatch: () => {
      dispatch(clearMatch());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWithHuman);
