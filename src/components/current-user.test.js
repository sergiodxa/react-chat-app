import React from "react";
import { render } from "@testing-library/react";

import CurrentUser from "./current-user";

test("CurrentUser component", () => {
  const { asFragment } = render(<CurrentUser username="test-user" />);
  expect(asFragment()).toMatchSnapshot();
});
