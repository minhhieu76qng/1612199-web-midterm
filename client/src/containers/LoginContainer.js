import { connect } from 'react-redux';
import WrappedLogin from '../components/login_register/Login';
import { login, getProfile } from '../actions';

const mapStateToProps = state => {
  return {
    isFetching: state.login.isFetching,
    success: state.login.success,
    errors: state.login.errors,
    user: state.login.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => {
      dispatch(login(user));
    },
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLogin);

export default LoginContainer;
