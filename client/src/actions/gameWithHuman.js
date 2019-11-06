export const SET_ISFETCHING = 'SET_ISFETCHING';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_ROOM = 'SET_ROOM';
export const CLEAR_MATCH = 'CLEAR_MATCH';
export const FETCH_GAME_DATA = 'FETCH_GAME_DATA';

export function setMessage(messageItem) {
  return { type: ADD_MESSAGE, messageItem };
}

export function setRoom(roomID) {
  return { type: SET_ROOM, roomID };
}

export function clearMatch() {
  return { type: CLEAR_MATCH };
}

export function fetchGameData(data) {
  return { type: FETCH_GAME_DATA, data };
}

export function setFetching(status) {
  return { type: SET_ISFETCHING, status };
}
