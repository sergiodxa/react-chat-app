import React from "react";
import { render } from "@testing-library/react";
import MessageGroup from "./message-group";

test("MessageGroup", () => {
  const scrollIntoViewMock = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

  const messages = [
    {
      content: "hola",
      username: "sergiodxa",
      date: "2019-06-02T00:45:43.963Z",
      channel: "general"
    },
    {
      content: "hola, que tal?",
      username: "sergiodxa",
      date: "2019-06-01T00:45:43.963Z",
      channel: "general"
    },
    {
      content: "hola, que tal?",
      username: "sergiodxa",
      date: "2019-05-03T00:45:43.963Z",
      channel: "general"
    }
  ];

  const { asFragment } = render(
    <MessageGroup now={new Date()} messages={messages} />
  );

  expect(asFragment()).toMatchSnapshot();

  expect(scrollIntoViewMock).toHaveBeenCalled();
});
