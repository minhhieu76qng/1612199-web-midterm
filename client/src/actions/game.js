export const MARK = 'MARK';
export const RESET_GAME = 'RESET_GAME';
export const JUMP_TO = 'JUMP_TO';

export function mark(row, col, player) {
  return { type: MARK, row, col, player };
}

export function jumpTo(step) {
  return { type: JUMP_TO, step };
}

export function resetGame() {
  return { type: RESET_GAME };
}
