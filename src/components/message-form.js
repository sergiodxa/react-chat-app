/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { FaPaperPlane } from "react-icons/fa";

function MessageForm({ isConnected, channel, username, ws }) {
  const [content, setContent] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (content.trim() === "" || ws.current.readyState !== WebSocket.OPEN) {
      return;
    }
    const date = new Date();
    const data = JSON.stringify({
      type: "message",
      payload: {
        username,
        content,
        channel,
        date
      }
    });
    ws.current.send(data);
    setContent("");
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  return (
    <form
      disabled={!isConnected}
      css={{ width: "100%", display: "flex" }}
      onSubmit={handleSubmit}
    >
      <input
        css={{
          flex: 1,
          padding: "1rem .5rem",
          fontSize: "1rem",
          outline: "none",
          border: "none",
          borderTop: "1px solid #ccc",
          ":focus": {},
          ":disabled": {
            backgroundColor: "#eaeaea"
          }
        }}
        disabled={!isConnected}
        type="text"
        autoComplete="false"
        placeholder={`Message #${channel}`}
        aria-label={`Message you want to send to the channel ${channel}`}
        value={content}
        onChange={handleChange}
      />
      <button
        css={{
          background: "none",
          border: "none",
          display: "flex",
          alignContent: "center",
          borderTop: "1px solid #ccc",
          padding: "1rem 1rem",
          fontSize: "1rem",
          outline: "none",
          transition: "color 300ms ease",
          color: content ? "black" : "#666",
          ":disabled": {
            backgroundColor: "#eaeaea"
          }
        }}
        disabled={!isConnected}
        aria-label="Send message"
        type="submit"
      >
        <FaPaperPlane />
      </button>
    </form>
  );
}

export default MessageForm;
