import React from "react";
import renderer from "react-test-renderer";

import MenuIcon from "./menu-icon";

test("<MenuIcon />", function () {
  const tree = renderer.create(<MenuIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});