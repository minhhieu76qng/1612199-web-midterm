import {
  START_FETCH_USER,
  STOP_FETCH_USER,
  FETCH_ERROR,
  START_LOGIN,
  END_LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  CLEAR_NOTIFICATIONS,
  SAVE_USER_FROM_TOKEN
} from '../actions/account';

const initialState = {
  isFetching: false,
  user: null,
  success: null,
  errors: null
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case START_LOGIN:
      return {
        ...state,
        isFetching: true,
        success: null,
        errors: null
      };
    case END_LOGIN:
      return {
        ...state,
        isFetching: false,
        success: action.success
      };
    case LOGIN_ERROR:
      return { ...state, isFetching: false, errors: action.errors };
    case LOGOUT:
      return { ...state, user: null };
    case START_FETCH_USER:
      return {
        ...state,
        isFetching: true,
        success: null,
        errors: null
      };
    case STOP_FETCH_USER:
      return {
        ...state,
        isFetching: false,
        user: action.data,
        success: action.success
      };
    case FETCH_ERROR:
      return { ...state, isFetching: false, errors: action.errors };
    case CLEAR_NOTIFICATIONS:
      return { ...state, isFetching: false, errors: null, success: null };
    case SAVE_USER_FROM_TOKEN:
      return { ...state, isFetching: false, user: action.payload };

    default:
      return state;
  }
}
