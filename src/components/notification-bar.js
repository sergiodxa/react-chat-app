/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { FaTimes } from "react-icons/fa";

function NotificationBar() {
  const [permissions, setPermissions] = React.useState(Notification.permission);
  const [isVisible, setIsVisible] = React.useState(true);

  if (permissions === "granted" || permissions === "denied" || !isVisible) {
    return null;
  }

  function handleCloseClick() {
    setIsVisible(false);
  }

  function handleMainClick() {
    Notification.requestPermission()
      .then(setPermissions);
  }

  return (
    <div
      css={{
        backgroundColor: "#783CEE",
        textAlign: "center",
        position: "relative"
      }}
    >
      <button
        aria-label="Give your authorization to to receive notifications on your computer"
        css={{
          background: "none",
          color: "white",
          cursor: "pointer",
          border: "none",
          fontSize: "1rem",
          padding: ".75rem 0",
          width: "100%",
          outline: "none"
        }}
        type="button"
        onClick={handleMainClick}
      >
        Give{" "}
        <em css={{ textDecoration: "underline", fontStyle: "normal" }}>
          your authorization
        </em>{" "}
        to receive notifications on your computer
      </button>
      <button
        css={{
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignContent: "center",
          fontSize: "1rem",
          outline: "none",
          position: "absolute",
          right: "1em",
          top: 0,
          bottom: 0,
          padding: "0 1em"
        }}
        aria-label="Close notification bar"
        type="button"
        onClick={handleCloseClick}
      >
        <FaTimes />
      </button>
    </div>
  );
}

export default NotificationBar;
