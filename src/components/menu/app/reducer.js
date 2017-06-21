export function percentage(state=-100, action) {
  switch (action.type) {
    case "TRANSLATE_X":
      return action.percentage;
    default:
      return state;
  }
}

export function touch(state=false, action) {
  switch (action.type) {
    case "TOUCH_SCREEN":
      return action.isHeld;
    default:
      return state;
  }
}