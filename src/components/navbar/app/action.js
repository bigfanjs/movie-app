export default function openPanel(panel) {
  return {
    type: "TOGGLE_PANEL",
    panel: panel
  };
}