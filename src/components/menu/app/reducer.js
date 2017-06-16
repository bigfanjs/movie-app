export default function (state = -100, action) {
  switch (action.type) {
    case "TRANSLATE_X":
      return action.percentage;
    default:
      return state;
  }
}