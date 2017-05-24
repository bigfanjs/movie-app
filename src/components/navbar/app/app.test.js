import React from "react";
import renderer from "react-test-renderer";

import App from "./app";

test("<App />", function () {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});