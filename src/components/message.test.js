import React from "react";
import { render } from "@testing-library/react";

import Message from "./message";

test("Message component active", () => {
  const date = new Date("2019-05-03T00:45:43.963Z");
  const { asFragment } = render(
    <Message
      username="test-user"
      date={date}
      content="This is a test"
      now={date.getTime() - 1}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

test("Message component non active", () => {
  const date = new Date("2019-05-03T00:45:43.963Z");
  const { asFragment } = render(
    <Message
      username="test-user"
      date={date}
      content="This is a test"
      now={date.getTime() + 1}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
