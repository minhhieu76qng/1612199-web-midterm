import Axios from 'axios';

export const START_REGISTER = 'START_REGISTER';
export const END_REGISTER = 'END_REGISTER';
export const REGISTER_ERROR = 'REGISTER_ERROR';

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
    return Axios.post('/api/v1/users', user)
      .then(response => {
        dispatch(endRegister(response.data.attributes, response.data.success));
      })
      .catch(error => {
        dispatch(registerError(error.response.data.errors));
      });
  };
}
