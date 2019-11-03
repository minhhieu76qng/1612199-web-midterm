import { connect } from 'react-redux';
import DisplayChats from '../components/chat/DisplayChats';

const mapStateToProps = state => {
  return {
    messages: state.gameWithHuman.messages
  };
};
export default connect(mapStateToProps)(DisplayChats);
