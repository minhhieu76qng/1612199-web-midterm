export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_ROOM = 'SET_ROOM';
export const CLEAR_MATCH = 'CLEAR_MATCH';

export function setMessage(messageItem) {
  return { type: ADD_MESSAGE, messageItem };
}

export function setRoom(roomID) {
  return { type: SET_ROOM, roomID };
}

export function clearMatch() {
  return { type: CLEAR_MATCH };
}
