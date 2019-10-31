import LocalStorage from '../utils/LocalStorage';
import authAxios from '../utils/authAxios';

export const MARK = 'MARK';
export const SET_TURN = 'SET_NEXT_TURN';
export const SET_WINNER = 'SET_WINNER';
export const ADD_HISTORY_ITEM = 'ADD_HISTORY_ITEM';
export const SET_STEP = 'SET_STEP';
export const EMPTY_HISTORY = 'EMPTY_HISTORY';
export const START_REGISTER = 'START_REGISTER';
export const END_REGISTER = 'END_REGISTER';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const START_LOGIN = 'START_LOGIN';
export const END_LOGIN = 'END_LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

export function mark({ row, col, player }) {
  return { type: MARK, row, col, player };
}

export function setTurn(turn) {
  return { type: SET_TURN, turn };
}

export function setWinner(winner) {
  return { type: SET_WINNER, winner };
}

export function addHistoryItem(historyItem) {
  return { type: ADD_HISTORY_ITEM, historyItem };
}

export function setHistoryStep(step) {
  return { type: SET_STEP, step };
}

export function emptyHistory() {
  return { type: EMPTY_HISTORY };
}

export function startRegister() {
  return { type: START_REGISTER };
}

export function endRegister(data, success) {
  return { type: END_REGISTER, data, success };
}

export function registerError(errors) {
  return { type: REGISTER_ERROR, errors };
}

export function register(user) {
  return dispatch => {
    dispatch(startRegister());

    // call api
    return authAxios
      .post('/api/v1/users', user)
      .then(response => {
        dispatch(endRegister(response.data.attributes, response.data.success));
      })
      .catch(error => {
        dispatch(registerError(error.response.data.errors));
      });
  };
}

export function startLogin() {
  return { type: START_LOGIN };
}

export function endLogin(data, success) {
  return { type: END_LOGIN, data, success };
}

export function loginError(errors) {
  return { type: LOGIN_ERROR, errors };
}

export function login(user) {
  return dispatch => {
    dispatch(startLogin());

    // call api
    return authAxios
      .post('/api/v1/users/login', user)
      .then(response => {
        const { token } = response.data;
        // set token to localstorage
        LocalStorage.setToken(token);

        dispatch(endLogin(response.data.user, response.data.success));
      })
      .catch(error => {
        dispatch(loginError(error.response.data.errors));
      });
  };
}

export function getProfile() {
  return dispatch => {
    dispatch(startLogin());

    const user = LocalStorage.getUser();

    if (!user) {
      return dispatch(endLogin(null, null));
    }

    return authAxios
      .get(`/api/v1/users/${user.id}`)
      .then(response => {
        dispatch(endLogin(response.data.attributes, null));
      })
      .catch(() => {
        dispatch(endLogin(null, null));
      });
  };
}

export function logOut() {
  return { type: LOGOUT };
}
