export default function (state = null, action) {
  switch(action.type) {
    case "OPEN_PANEL":
      return action.panel;
    default:
      return state;
  }
}