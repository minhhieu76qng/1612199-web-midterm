import { connect } from 'react-redux';
import IndexPage from '../components/game/IndexPage';
import { setRoom } from '../actions/gameWithHuman';

const mapDispatchToProps = dispatch => {
  return {
    setRoom: roomID => {
      dispatch(setRoom(roomID));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(IndexPage);
