import { ADD_MESSAGE, SET_ROOM, CLEAR_MATCH } from '../actions/gameWithHuman';

const initialState = {
  xIsNext: true,
  list: [
    {
      board: new Array(20).fill(null).map(() => new Array(20).fill(null)),
      lastPosition: null
    }
  ],
  step: 0,
  messages: [],
  roomID: null
};

export default function gameWithHuman(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.messageItem] };

    case SET_ROOM:
      return { ...state, roomID: action.roomID };
    case CLEAR_MATCH:
      return { ...initialState };
    default:
      return state;
  }
}
