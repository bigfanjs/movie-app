export default function (state = null, action) {
  switch(action.type) {
    case "OPEN_PANEL":
      return action.panel;
    case "CLOSE_PANEL":
      return null;
    default:
      return state;
  }
}