import React from "react";
import renderer from "react-test-renderer";

import FilterIcon from "../filter-icon";

test("<FilterIcon />", function () {
  const tree = renderer.create(<FilterIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});