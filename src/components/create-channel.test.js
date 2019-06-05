import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import CreateChannel from "./create-channel";

test("CreateChannel", async () => {
  const onCreate = jest.fn();
  const channels = ["general", "testing"];
  const { getByLabelText } = render(
    <CreateChannel channels={channels} onCreate={onCreate} />
  );

  const button = getByLabelText("Open create channel dialog");
  fireEvent.click(button);

  const input = await waitForElement(() => getByLabelText("Channel name"));
  fireEvent.change(input, {
    target: {
      value: "react"
    }
  });
  fireEvent.submit(input);

  expect(onCreate).toHaveBeenCalledWith("react");
});

test("CreateChannel UI", async () => {
  const { getByLabelText, asFragment } = render(
    <CreateChannel channels={["general"]} onCreate={jest.fn()} />
  );

  expect(asFragment()).toMatchSnapshot();

  fireEvent.click(getByLabelText("Open create channel dialog"));
  await waitForElement(() => getByLabelText("Channel name"));
  expect(asFragment()).toMatchSnapshot();

  fireEvent.click(getByLabelText("Close create channel dialog"));
  expect(asFragment()).toMatchSnapshot();
});
