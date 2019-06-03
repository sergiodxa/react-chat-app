import React from "react";
import { render } from "react-dom";
import { Global } from "@emotion/core";

import LoginView from "./views/login";
import ChatView from "./views/chat";

function App({ url, now }) {
  const [username, setUsername] = React.useState(
    localStorage.getItem("username")
  );

  function handleUsername(value) {
    localStorage.setItem("username", value);
    setUsername(value);
  }

  return (
    <>
      <Global
        styles={{
          body: {
            margin: 0,
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
          }
        }}
      />
      {username ? (
        <ChatView url={url} username={username} now={now} />
      ) : (
        <LoginView onUsername={handleUsername} />
      )}
    </>
  );
}

const $root = document.getElementById("root");
render(<App url="ws://localhost:4000" now={new Date()} />, $root);
