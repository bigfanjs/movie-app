export default function (state = "", action) {
  switch (action.type) {
    case "TOUCH_ICON":
      return action.icon;
    default:
      return state;
  }
}