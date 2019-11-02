import jwt from 'jsonwebtoken';
import { push } from 'connected-react-router';
import FormData from 'form-data';
import axiosIns from '../utils/authAxios';
import LocalStorage from '../utils/LocalStorage';

export const START_LOGIN = 'START_LOGIN';
export const END_LOGIN = 'END_LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const START_FETCH_USER = 'START_FETCH_USER';
export const STOP_FETCH_USER = 'STOP_FETCH_USER';
export const FETCH_ERROR = 'FETCH_ERROR';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const SAVE_USER_FROM_TOKEN = 'SAVE_USER_FROM_TOKEN';

export function startFetch() {
  return { type: START_FETCH_USER };
}
export function stopFetch(data, success) {
  if (data.token) {
    const { token } = data;
    LocalStorage.setToken(token);
  }
  return { type: STOP_FETCH_USER, data: null, success };
}

export function fetchError(errors) {
  return { type: FETCH_ERROR, errors };
}

export function startLogin() {
  return { type: START_LOGIN };
}

export function endLogin(success) {
  return { type: END_LOGIN, success };
}

export function loginError(errors) {
  return { type: LOGIN_ERROR, errors };
}

export function clearNotifications() {
  return { type: CLEAR_NOTIFICATIONS };
}

// //////////////////////////////////////////////////////////////////////////
//                              MIDDLEWARES                               //
// ////////////////////////////////////////////////////////////////////////

export function saveUserFromToken() {
  const userFromToken = LocalStorage.getUser();

  return { type: SAVE_USER_FROM_TOKEN, payload: userFromToken };
}

export function login(user) {
  return dispatch => {
    dispatch(startLogin());

    // call api
    return axiosIns
      .createInstance()
      .post('/api/v1/users/login', user)
      .then(response => {
        const { token } = response.data;
        // set token to localstorage
        LocalStorage.setToken(token);

        dispatch(saveUserFromToken());

        dispatch(endLogin(response.data.success));
      })
      .catch(error => {
        dispatch(loginError(error.response.data.errors));
      });
  };
}

export function logOut() {
  return { type: LOGOUT };
}

export function updateUserInfo(user) {
  return dispatch => {
    dispatch(startFetch());

    // tach token -> lay id
    const token = LocalStorage.getToken();
    const userInToken = jwt.decode(token);

    if (!token || !userInToken || !userInToken.id) {
      LocalStorage.removeToken();
      dispatch(
        fetchError([{ message: 'Not Authenticated! Redirecting to login...' }])
      );
      dispatch(clearNotifications());
      dispatch(push('/login'));
      return {};
    }

    const axiosInstance = axiosIns.createInstance();

    return axiosInstance
      .patch(`/api/v1/users/${userInToken.id}`, user)
      .then(response => {
        dispatch(stopFetch(response.data.attributes, response.data.success));
      })
      .catch(err => {
        if (err.response.status === 401) {
          LocalStorage.removeToken();
        }
        dispatch(fetchError(err.response.data.errors));
      });
  };
}

export function fetchUser() {
  return dispatch => {
    dispatch(startFetch());

    // tach token -> lay id
    const token = LocalStorage.getToken();
    const userInToken = jwt.decode(token);

    if (!token || !userInToken || !userInToken.id) {
      LocalStorage.removeToken();
      dispatch(
        fetchError([{ message: 'Not Authenticated! Redirecting to login...' }])
      );
      dispatch(clearNotifications());
      dispatch(push('/login'));
      return {};
    }

    const axiosInstance = axiosIns.createInstance();

    return axiosInstance
      .get(`/api/v1/users/${userInToken.id}`)
      .then(response => {
        dispatch(stopFetch(response.data.attributes, response.data.success));
      })
      .catch(err => {
        if (err.response.status === 401) {
          LocalStorage.removeToken();
        }
        dispatch(fetchError(err.response.data.errors));
      });
  };
}

export function changePassword(user) {
  return dispatch => {
    dispatch(startFetch());

    // tach token -> lay id
    const token = LocalStorage.getToken();
    const userInToken = jwt.decode(token);

    if (!token || !userInToken || !userInToken.id) {
      LocalStorage.removeToken();
      dispatch(
        fetchError([{ message: 'Not Authenticated! Redirecting to login...' }])
      );
      dispatch(clearNotifications());
      dispatch(push('/login'));
      return {};
    }

    const axiosInstance = axiosIns.createInstance();

    return axiosInstance
      .patch(`/api/v1/users/${userInToken.id}/password`, user)
      .then(response => {
        dispatch(stopFetch(response.data.attributes, response.data.success));
      })
      .catch(err => {
        if (err.response.status === 401) {
          LocalStorage.removeToken();
        }
        dispatch(fetchError(err.response.data.errors));
      });
  };
}

export function uploadAvatar(file, onProgress, onSuccess, onError) {
  return dispatch => {
    dispatch(startFetch());

    // tach token -> lay id
    const token = LocalStorage.getToken();
    const userInToken = jwt.decode(token);

    if (!token || !userInToken || !userInToken.id) {
      LocalStorage.removeToken();
      dispatch(
        fetchError([{ message: 'Not Authenticated! Redirecting to login...' }])
      );
      dispatch(clearNotifications());
      dispatch(push('/login'));
      return {};
    }

    const formData = new FormData();
    formData.append('image', file);

    return axiosIns
      .createInstance()
      .patch(`/api/v1/users/${userInToken.id}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'multipart/form-data'
        },
        onUploadProgress(progressEvent) {
          onProgress(
            {
              percent: Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              )
            },
            file
          );
        }
      })
      .then(response => {
        onSuccess(response.data.data, file);
        dispatch(stopFetch(response.data.attributes, response.data.success));
      })
      .catch(err => {
        onError();
        dispatch(fetchError(err));
      });
  };
}
