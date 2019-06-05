import React from "react";
import { render } from "@testing-library/react";

import ChannelList from "./channel-list";

test("ChannelList component", () => {
  const { asFragment } = render(
    <ChannelList
      channels={["general", "testing", "varios"]}
      currentChannel="testing"
      onChannelChange={jest.fn()}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
