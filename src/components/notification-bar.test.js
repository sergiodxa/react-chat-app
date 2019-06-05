import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved
} from "@testing-library/react";

import NotificationBar from "./notification-bar";

test("NotificationBar should be closable", () => {
  const { getByLabelText, asFragment } = render(<NotificationBar />);

  expect(asFragment()).toMatchSnapshot();

  fireEvent.click(getByLabelText("Close notification bar"));

  expect(asFragment()).toMatchSnapshot();
});

test("NotificationBar should be clickable", async () => {
  const { getByLabelText } = render(<NotificationBar />);

  fireEvent.click(
    getByLabelText(
      "Give your authorization to receive notifications on your computer"
    )
  );

  await waitForElementToBeRemoved(() =>
    getByLabelText(
      "Give your authorization to receive notifications on your computer"
    )
  );

  expect(() =>
    getByLabelText(
      "Give your authorization to receive notifications on your computer"
    )
  ).toThrow();
});
