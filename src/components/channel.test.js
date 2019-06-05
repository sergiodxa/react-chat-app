import React from "react";
import { render, fireEvent, getNodeText } from "@testing-library/react";

import Channel from "./channel";

test("Channel component", () => {
  const onClick = jest.fn();

  const { getByLabelText } = render(
    <Channel name="testing" onClick={onClick} />
  );

  const button = getByLabelText("Change to channel testing");

  expect(getNodeText(button)).toBe("# testing");

  fireEvent.click(button);

  expect(onClick).toHaveBeenCalledWith("testing");
});

test("Channel component active", () => {
  const { asFragment } = render(
    <Channel name="general" onClick={jest.fn()} isActive />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("Channel component non- active", () => {
  const { asFragment } = render(<Channel name="general" onClick={jest.fn()} />);
  expect(asFragment()).toMatchSnapshot();
});
