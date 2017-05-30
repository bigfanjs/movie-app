export function setLocation(location) {
  return {
    type: "SET_LOCATION",
    location: location
  };
}

export function showFilter() {
  return {
    type: "SHOW_FILTER",
    filter: true
  };
}

export function closeMenu() {
  return {
    type: "TOGGLE_PANEL",
    panel: false
  };
}