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
    name: false,
  };
}

export function openMenu() {
  return {
    type: "TOGGLE_PANEL",
    name: "menu",
  };
}

export function translateX(percentage, done) {
  return {
    type: "TRANSLATE_X",
    percentage: percentage,
    done: done
  };
}