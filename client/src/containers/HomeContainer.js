import { connect } from 'react-redux';
import Home from '../components/home/Home';
import { logOut, getProfile } from '../actions';

const mapStateToProps = state => {
  return {
    user: state.login.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    },
    getProfile: () => {
      dispatch(getProfile());
    }
  };
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;
