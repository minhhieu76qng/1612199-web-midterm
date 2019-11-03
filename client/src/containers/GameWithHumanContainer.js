import { connect } from 'react-redux';
import GameWithHuman from '../components/game/GameWithHuman';
import { clearMatch } from '../actions/gameWithHuman';

const mapDispatchToProps = dispatch => {
  return {
    clearMatch: () => {
      dispatch(clearMatch());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GameWithHuman);
