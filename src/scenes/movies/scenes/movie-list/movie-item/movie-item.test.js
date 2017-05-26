import React from "react";
import renderer from "react-test-renderer";

import MovieItem from "./movie-item";

test("<MovieItem />", function () {
  const tree = renderer.create(<MovieItem />).toJSON();
  expect(tree).toMatchSnapshot();
});