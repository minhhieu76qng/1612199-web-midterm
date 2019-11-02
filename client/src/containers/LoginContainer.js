import { connect } from 'react-redux';
import WrappedLogin from '../components/login_register/Login';
import { saveUserFromToken, login } from '../actions/account';

const mapStateToProps = state => {
  return {
    isFetching: state.account.isFetching,
    success: state.account.success,
    errors: state.account.errors,
    user: state.account.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => {
      dispatch(login(user));
    },
    saveUserFromToken: () => {
      dispatch(saveUserFromToken());
    }
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLogin);

export default LoginContainer;
