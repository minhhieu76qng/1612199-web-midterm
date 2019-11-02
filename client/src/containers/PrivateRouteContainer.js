import { connect } from 'react-redux';
import { saveUserFromToken, clearNotifications } from '../actions/account';
import PrivateRoute from '../layout/PrivateRoute';

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserFromToken: () => {
      dispatch(saveUserFromToken());
    },
    clearNotifications: () => {
      dispatch(clearNotifications());
    }
  };
};

const PrivateRouteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);

export default PrivateRouteContainer;
