import { connect } from 'react-redux';
import ChangePassword from '../components/account/ChangePassword';
import { changePassword, clearNotifications } from '../actions/account';

const mapStateToProps = state => {
  return {
    isFetching: state.account.isFetching,
    errors: state.account.errors,
    success: state.account.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePassword: user => {
      dispatch(changePassword(user));
    },
    clearMessage: () => {
      dispatch(clearNotifications());
    }
  };
};

const ChangePasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

export default ChangePasswordContainer;
