import { connect } from 'react-redux';
import WrappedFormInput from '../components/chat/FormInput';
import { setMessage } from '../actions/gameWithHuman';

const mapStateToProps = state => {
  return {
    roomID: state.gameWithHuman.roomID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: (id, name, msg) => {
      dispatch(setMessage({ id, name, msg }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedFormInput);
