export default function (state = null, action) {
  switch(action.type) {
    case "TOGGLE_PANEL":
      return action.name;
    default:
      return state;
  }
}