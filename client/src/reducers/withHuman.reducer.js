import {
  ADD_MESSAGE,
  SET_ROOM,
  CLEAR_MATCH,
  FETCH_GAME_DATA,
  SET_ISFETCHING
} from '../actions/gameWithHuman';
import { size } from '../constants/constants';

const initialState = {
  isFetching: false,
  xIsNext: true,
  list: [
    {
      board: new Array(size).fill(null).map(() => new Array(size).fill(null)),
      lastPosition: null
    }
  ],
  messages: [],
  roomID: null
};

export default function gameWithHuman(state = initialState, action) {
  switch (action.type) {
    case SET_ISFETCHING:
      return { ...state, isFetching: action.status };
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.messageItem] };

    case SET_ROOM:
      return { ...state, roomID: action.roomID };
    case CLEAR_MATCH:
      return { ...initialState };
    case FETCH_GAME_DATA:
      return {
        ...state,
        messages: [...action.data.messages]
      };
    // case FETCH_GAME_DATA:
    //   return {
    //     ...state,
    //     messages: [...action.data.messages],
    //     xIsNext: action.data.xIsNext,
    //     list: [...action.data.list]
    //   };
    default:
      return state;
  }
}
