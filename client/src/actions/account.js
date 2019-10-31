import jwt from 'jsonwebtoken';
import authAxios from '../utils/authAxios';
import LocalStorage from '../utils/LocalStorage';

export const START_FETCH_USER = 'START_FETCH_USER';
export const STOP_FETCH_USER = 'STOP_FETCH_USER';
export const FETCH_ERROR = 'FETCH_ERROR';

export function startFetch() {
  return { type: START_FETCH_USER };
}
export function stopFetch(data, success) {
  return { type: STOP_FETCH_USER, data, success };
}

export function fetchError(errors) {
  return { type: FETCH_ERROR, errors };
}

// middleware
export function updateUserInfo(user) {
  return dispatch => {
    dispatch(startFetch());

    // tach token -> lay id
    const token = LocalStorage.getToken();
    const userInToken = jwt.decode(token);

    if (!userInToken || !userInToken.id) {
      return dispatch(fetchError());
    }

    return authAxios
      .patch(`/api/v1/users/${userInToken.id}`, user)
      .then(response => {
        dispatch(stopFetch(response.data.attributes, response.data.success));
      })
      .catch(err => {
        dispatch(fetchError(err.response.data.errors));
      });
  };
}

export function fetchUser() {
  return dispatch => {
    dispatch(startFetch());

    // tach token -> lay id
    const token = LocalStorage.getToken();
    const { id } = jwt.decode(token);

    return authAxios
      .get(`/api/v1/users/${id}`)
      .then(response => {
        dispatch(stopFetch(response.data.attributes, response.data.success));
      })
      .catch(err => {
        dispatch(fetchError(err.response.data.errors));
      });
  };
}

export function changePassword(user) {
  return dispatch => {
    dispatch(startFetch());

    // tach token -> lay id
    const token = LocalStorage.getToken();
    const { id } = jwt.decode(token);

    return authAxios
      .patch(`/api/v1/users/${id}/password`, user)
      .then(response => {
        dispatch(stopFetch(response.data.attributes, response.data.success));
      })
      .catch(err => {
        dispatch(fetchError(err.response.data.errors));
      });
  };
}

// export function uploadAvatar(user) {
//   return { type: UPLOAD_AVATAR, user };
// }
