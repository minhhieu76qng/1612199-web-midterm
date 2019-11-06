import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import IndexPage from '../components/game/IndexPage';
import { setRoom } from '../actions/gameWithHuman';

const mapDispatchToProps = dispatch => {
  return {
    setRoom: roomID => {
      dispatch(setRoom(roomID));
    },
    push: url => {
      dispatch(push(url));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(IndexPage);
