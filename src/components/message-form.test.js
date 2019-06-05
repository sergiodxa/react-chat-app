import React from "react";
import { render, fireEvent } from "@testing-library/react";

import MessageForm from "./message-form";

test("MessageForm component", () => {
  const ws = {
    current: {
      readyState: 1,
      send: jest.fn()
    }
  };

  const { getByLabelText } = render(
    <MessageForm isConnected channel="test" username="test-user" ws={ws} />
  );

  const input = getByLabelText("Message you want to send to the channel test");

  fireEvent.change(input, {
    target: {
      value: "Testing message"
    }
  });

  fireEvent.submit(input);

  expect(ws.current.send).toHaveBeenCalled();
});

test("MessageForm component connected", () => {
  const { asFragment } = render(
    <MessageForm
      isConnected
      channel="test"
      username="test-user"
      ws={{ current: {} }}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

test("MessageForm component disconnected", () => {
  const { asFragment } = render(
    <MessageForm
      isConnected={false}
      channel="test"
      username="test-user"
      ws={{ current: {} }}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
