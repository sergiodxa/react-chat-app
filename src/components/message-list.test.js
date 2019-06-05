import React from "react";
import { render } from "@testing-library/react";

import MessageList from "./message-list";

test("ChannelList component", () => {
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
    <MessageList messages={messages} now={new Date()} />
  );

  expect(asFragment()).toMatchSnapshot();
});
