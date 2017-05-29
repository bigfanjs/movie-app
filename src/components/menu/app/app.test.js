import React from "react";
import renderer from "react-test-renderer";

import Menu from "../app";

test("<Menu />", function () {
  const tree = renderer.create(<Menu />).toJSON();
  expect(tree).toMatchSnapshot();
});