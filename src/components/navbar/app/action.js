export function openPanel(name) {
  return {
    type: "TOGGLE_PANEL",
    name: name
  };
}

export function touchIcon(icon) {
  return {
    type: "TOUCH_ICON",
    icon: icon
  };
}