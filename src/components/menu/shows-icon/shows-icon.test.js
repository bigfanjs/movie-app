import React from "react";
import renderer from "react-test-renderer";

import ShowsIcon from "../shows-icon";

test("<ShowsIcon />", function () {
  const tree = renderer.create(<ShowsIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});