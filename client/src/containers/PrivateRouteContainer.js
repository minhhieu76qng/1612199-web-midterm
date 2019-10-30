import { connect } from 'react-redux';
import { getProfile } from '../actions/index';
import PrivateRoute from '../layout/PrivateRoute';

const mapStateToProps = state => {
  return {
    user: state.login.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};

const PrivateRouteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);

export default PrivateRouteContainer;
