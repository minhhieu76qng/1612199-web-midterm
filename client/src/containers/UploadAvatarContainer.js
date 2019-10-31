import { connect } from 'react-redux';
import UploadAvatar from '../components/account/UploadAvatar';
import { uploadAvatar } from '../actions/account';

const mapStateToProps = state => {
  return {
    user: state.account.user,
    success: state.account.success,
    errors: state.account.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadAvatar: (file, onProgress, onSuccess, onError) => {
      dispatch(uploadAvatar(file, onProgress, onSuccess, onError));
    }
  };
};

const UploadAvatarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadAvatar);
export default UploadAvatarContainer;
