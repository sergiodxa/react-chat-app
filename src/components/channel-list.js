/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

import Channel from "./channel";

function ChannelList({ channels, currentChannel, onChannelChange }) {
  return (
    <React.Fragment>
      {channels.map(channel => (
        <Channel
          key={channel}
          name={channel}
          isActive={channel === currentChannel}
          onClick={onChannelChange}
        />
      ))}
    </React.Fragment>
  );
}

export default ChannelList;
