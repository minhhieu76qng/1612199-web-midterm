import { connect } from 'react-redux';
import GameWithHuman from '../components/game/GameWithHuman';
import {
  clearMatch,
  fetchGameData,
  setFetching
} from '../actions/gameWithHuman';

const mapStateToProps = state => {
  return {
    roomID: state.gameWithHuman.roomID,
    isFetching: state.gameWithHuman.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearMatch: () => {
      dispatch(clearMatch());
    },
    fetchGameData: data => {
      dispatch(fetchGameData(data));
    },
    setFetching: status => {
      dispatch(setFetching(status));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWithHuman);
