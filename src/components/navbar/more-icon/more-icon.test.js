import React from "react";
import renderer from "react-test-renderer";

import MoreIcon from "./more-icon";

export default function () {
  const tree = renderer.create(<MoreIcon />).toJSON();
  expect(tree).toMatchSnapshot();
}