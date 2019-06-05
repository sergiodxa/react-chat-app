import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Login from "./login";

test("Login component", () => {
  const onUsername = jest.fn();

  const { asFragment, getByLabelText } = render(
    <Login onUsername={onUsername} />
  );

  expect(asFragment()).toMatchSnapshot();

  const input = getByLabelText("Enter your username");

  fireEvent.change(input, {
    target: { value: "test-user" }
  });

  fireEvent.submit(input);

  expect(onUsername).toHaveBeenCalledWith("test-user");
});
