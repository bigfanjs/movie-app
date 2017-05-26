import React from "react";
import renderer from "react-test-renderer";

import SearchIcon from "./search-icon";

test("<SearchIcon />", function () {
  const tree = renderer.create(<SearchIcon/>).toJSON();
  expect(tree).toMatchSnapshot();
});