import { connect } from 'react-redux';
import UpdateInfo from '../components/account/UpdateInfo';
import { updateUserInfo, clearNotifications } from '../actions/account';

const mapStateToProps = state => {
  return {
    user: state.account.user,
    errors: state.account.errors,
    success: state.account.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: user => {
      dispatch(updateUserInfo(user));
    },
    clearMessage: () => {
      dispatch(clearNotifications());
    }
  };
};

const UpdateInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateInfo);
export default UpdateInfoContainer;
