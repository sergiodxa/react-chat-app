import React from "react";
import { EventEmitter } from "events";
import {
  render,
  fireEvent,
  getNodeText,
  waitForElement,
} from "@testing-library/react";

import Chat from "./chat";

test("Chat component", async () => {
  const scrollIntoViewMock = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

  global.WebSocket = class WebSocket extends EventEmitter {
    constructor() {
      super();
      this.emit("open");
    }
    send(data) {
      this.emit("message", { data });
    }
    close() {
      this.emit("close");
    }
    addEventListener = this.on;
    removeEventListener = this.off;
  };

  const username = "testing-user";

  const { getByLabelText, getByText } = render(
    <Chat username={username} url="ws://testing" now={new Date()} />
  );

  expect(() => getByLabelText("Change to channel testing")).toThrow();

  fireEvent.click(getByLabelText("Open create channel dialog"));
  const channelNameInput = await waitForElement(() =>
    getByLabelText("Channel name")
  );
  fireEvent.change(channelNameInput, { target: { value: "testing" } });
  fireEvent.submit(channelNameInput);

  expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
  expect(getNodeText(getByLabelText("Change to channel testing"))).toBe(
    "# testing"
  );

  // send a new message
  const newMessageInput = getByLabelText(
    "Message you want to send to the channel testing"
  );
  fireEvent.change(newMessageInput, { target: { value: "Testing message" } });
  fireEvent.submit(newMessageInput);

  expect(() => getByText("Testing message")).not.toThrow();
  expect(scrollIntoViewMock).toHaveBeenCalledTimes(2);
});
