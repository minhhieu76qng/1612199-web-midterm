import { connect } from 'react-redux';
import { logOut } from '../actions/account';
import NavBar from '../components/nav/NavBar';

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    }
  };
};

const NavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default NavBarContainer;
