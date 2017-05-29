import React from "react";
import renderer from "react-test-renderer";

import MoviesIcon from "../movies-icon";

test("<MoviesIcon />", function () {
  const tree = renderer.create(<MoviesIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});