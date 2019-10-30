import {
  START_FETCH_USER,
  STOP_FETCH_USER,
  FETCH_ERROR
} from '../actions/account';

const initialState = {
  isFetching: false,
  user: null,
  success: null,
  errors: null
};

export default function account(state = initialState, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}
