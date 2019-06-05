/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

import ChannelList from "../components/channel-list";
import CreateChannel from "../components/create-channel";
import CurrentChannel from "../components/current-channel";
import CurrentUser from "../components/current-user";
import MessageForm from "../components/message-form";
import MessageGroup from "../components/message-group";
import NotificationBar from "../components/notification-bar";

import notify from "../utils/notify";

const initialMessages = JSON.parse(
  localStorage.getItem("messages") ||
    JSON.stringify([
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
    ])
);

const initialChannels = JSON.parse(
  localStorage.getItem("channels") || '["general"]'
);

function ChatView({ username, url, now }) {
  const ws = React.useRef(null);

  const [connectionKey, setConnectionKey] = React.useState(Date.now());
  const [channels, setChannels] = React.useState(initialChannels);
  const [currentChannel, setCurrentChannel] = React.useState("general");
  const [messages, setMessages] = React.useState(initialMessages);
  const [isConnected, setIsConnected] = React.useState(false);
  const [isPageVisible, setIsPageVisible] = React.useState(true);

  React.useEffect(() => {
    const server = new WebSocket(url);
    ws.current = server;
    server.addEventListener("message", event => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case "channel": {
          setChannels(state => [
            ...new Set(state.concat(message.payload.name))
          ]);
          notify(
            "New channel created",
            `The channel ${message.payload.name} has been created by ${
              message.payload.username
            }.`
          );
          return;
        }
        case "message": {
          setMessages(state => state.concat(message.payload));
          if (!isPageVisible || message.payload.channel !== currentChannel) {
            notify(
              `New message on channel ${message.payload.channel}`,
              message.payload.content
            );
          }
          return;
        }
        default: {
          console.error("Unexpeced WebSocket message type %s", message.type);
        }
      }
    });
    server.addEventListener("open", () => setIsConnected(true));
    server.addEventListener("close", () => {
      setIsConnected(true);
      setConnectionKey(Date.now());
    });
    return () => {
      ws.current = null;
      server.close();
    };
  }, [url, connectionKey, isPageVisible, currentChannel]);

  React.useEffect(() => {
    localStorage.setItem("channels", JSON.stringify(channels));
  }, [channels]);

  React.useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  React.useEffect(() => {
    function handler() {
      setIsPageVisible(!window.hidden);
    }

    window.addEventListener("visibilitychange", handler);
    return () => window.removeEventListener("visibilitychange", handler);
  }, [setIsPageVisible]);

  function handleChannelChange(name) {
    setCurrentChannel(name);
  }

  function handleCreate(name) {
    setChannels(state => [...new Set(state.concat(name))]);
    setCurrentChannel(name);
    ws.current.send(
      JSON.stringify({
        type: "channel",
        payload: { name, username }
      })
    );
  }

  return (
    <main
      css={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: "320px 1fr",
        gridTemplateAreas: "'notification notification' 'channels messages'",
        height: "100vh"
      }}
    >
      <section css={{ gridArea: "notification" }}>
        <NotificationBar />
      </section>
      <section
        css={{
          borderRight: "1px solid #ccc",
          gridArea: "channels",
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <CurrentUser username={username} />
        <div
          css={{
            border: "1px solid #ccc",
            borderLeft: "none",
            borderRight: "none",
            flex: 1
          }}
        >
          <ChannelList
            channels={channels}
            currentChannel={currentChannel}
            onChannelChange={handleChannelChange}
          />
        </div>
        <CreateChannel channels={channels} onCreate={handleCreate} />
      </section>
      <section
        css={{
          gridArea: "messages",
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <CurrentChannel channel={currentChannel} />
        <div
          css={{
            flex: 1,
            position: "relative",
            borderTop: "1px solid #ccc"
          }}
        >
          <div
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflowY: "auto"
            }}
          >
            <MessageGroup
              now={now}
              messages={messages
                .map(message => ({ ...message, date: new Date(message.date) }))
                .sort((a, b) => a.date - b.date)
                .filter(({ channel }) => channel === currentChannel)}
            />
          </div>
        </div>
        <MessageForm
          ws={ws}
          username={username}
          isConnected={isConnected}
          channel={currentChannel}
        />
      </section>
    </main>
  );
}

export default ChatView;
