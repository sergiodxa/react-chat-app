/** @jsx jsx */
import { jsx } from "@emotion/core";

import Message from "./message";

function MessageList({ messages, now }) {
  return (
    <section>
      {messages.map(message => (
        <Message key={message.date} now={now} {...message} />
      ))}
    </section>
  );
}

export default MessageList;
