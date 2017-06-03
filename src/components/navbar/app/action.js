export function openPanel(panel) {
  return {
    type: "TOGGLE_PANEL",
    panel: panel
  };
}

export function touchIcon(icon) {
  return {
    type: "TOUCH_ICON",
    icon: icon
  };
}