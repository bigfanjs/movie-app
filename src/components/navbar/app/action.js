export function openPanel(panel) {
  return {
    type: "OPEN_PANEL",
    panel: panel
  };
}

export function closePanel() {
  return {
    type: "CLOSE_PANEL",
    panel: null
  };
}