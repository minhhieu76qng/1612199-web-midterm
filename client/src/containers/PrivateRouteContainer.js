import { connect } from 'react-redux';
import { fetchUser } from '../actions/account';
import PrivateRoute from '../layout/PrivateRoute';

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => {
      dispatch(fetchUser());
    }
  };
};

const PrivateRouteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);

export default PrivateRouteContainer;
