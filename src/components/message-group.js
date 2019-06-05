/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import isToday from "date-fns/is_today";
import isYesterday from "date-fns/is_yesterday";

import MessageList from "./message-list";

import group from "../utils/group";

function MessageGroup({ messages, now }) {
  const $messages = React.useRef(null);

  React.useEffect(() => {
    if (!$messages.current) return;
    const $lastGroup = $messages.current.lastChild;
    if (!$lastGroup) return;
    const $lastMessage = $lastGroup.lastChild;
    if (!$lastMessage) return;
    $lastMessage.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages.length]);

  return (
    <section ref={$messages}>
      {Object.entries(group(messages)).map(([group, groupedMessages]) => {
        const groupName = isToday(groupedMessages[0].date)
          ? "Today"
          : isYesterday(groupedMessages[0].date)
          ? "Yesterday"
          : group;
        return (
          <React.Fragment key={group}>
            <header css={{ position: "relative", margin: "2rem 0" }}>
              <h3
                css={{
                  background: "white",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  transform: "translateY(-50%)",
                  margin: "0 auto",
                  fontSize: "1rem",
                  fontWeight: "normal",
                  textAlign: "center",
                  width: "20%"
                }}
              >
                {groupName}
              </h3>
              <hr css={{ border: 0, borderTop: "1px solid #ccc" }} />
            </header>
            <MessageList now={now} messages={groupedMessages} />
          </React.Fragment>
        );
      })}
    </section>
  );
}

export default MessageGroup;
