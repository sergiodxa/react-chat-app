import React from "react";
import { render } from "@testing-library/react";

import CurrentChannel from "./current-channel";

test("CurrentChannel component", () => {
  const { asFragment } = render(<CurrentChannel channel="general" />);
  expect(asFragment()).toMatchSnapshot();
});
