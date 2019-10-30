import axios from 'axios';

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

    return axios
      .patch(`/api/v1/users/${user.id}`, user)
      .then(response => {
        dispatch(stopFetch(response.data.attributes, response.data.success));
      })
      .catch(err => {
        dispatch(fetchError(err.response.data.errors));
      });
  };
}

export function fetchUser(id) {
  return dispatch => {
    dispatch(startFetch());

    return axios
      .get(`/api/v1/users/${id}`)
      .then(response => {
        dispatch(stopFetch(response.data.attributes, response.data.success));
      })
      .catch(err => {
        dispatch(fetchError(err.response.data.errors));
      });
  };
}

// export function changePassword(user) {
//   return { type: CHANGE_PASSWORD, user };
// }

// export function uploadAvatar(user) {
//   return { type: UPLOAD_AVATAR, user };
// }
