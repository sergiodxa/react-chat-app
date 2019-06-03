/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { FaPlus, FaTimes } from "react-icons/fa";

function CreateChannel({ channels, onCreate }) {
  const [channelName, setChannelName] = React.useState("");
  const $dialog = React.useRef(null);

  function handleOpenClick(event) {
    if ($dialog.current) $dialog.current.showModal();
    event.target.blur();
  }

  function handleCloseClick(event) {
    if ($dialog.current) $dialog.current.close();
    event.target.blur();
  }

  function handleChange(event) {
    setChannelName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onCreate(channelName);
    if ($dialog.current) $dialog.current.close();
    setChannelName("");
  }

  return (
    <>
      <button
        css={{
          background: "none",
          border: "none",
          color: "black",
          cursor: "pointer",
          display: "flex",
          fontSize: "1rem",
          justifyContent: "space-between",
          outline: "none",
          padding: "1rem .5rem",
          width: "100%"
        }}
        type="button"
        onClick={handleOpenClick}
      >
        Create Channel <FaPlus />
      </button>
      <dialog
        ref={$dialog}
        css={{
          border: "none",
          borderRadius: ".25rem",
          position: "fixed",
          top: "50%",
          transform: "translateY(-50%)",
          padding: "2rem 1rem",
          width: "80%",
          maxWidth: 360,
          "::backdrop": {
            backgroundColor: "rgba(0, 0, 0, .5)"
          }
        }}
      >
        <button
          css={{
            position: "absolute",
            right: "1rem",
            top: "2rem",
            padding: ".5rem",
            fontSize: "1rem",
            background: "none",
            border: "none",
            display: "flex",
            alignContent: "center"
          }}
          aria-label="Close create channel dialog"
          onClick={handleCloseClick}
        >
          <FaTimes />
        </button>
        <h3 css={{ margin: 0, fontWeight: "500", textAlign: "center" }}>
          Create new channel
        </h3>
        <form onSubmit={handleSubmit} disabled={channels.includes(channelName)}>
          <label css={{ display: "none" }} htmlFor="new-channel-name">
            Channel name
          </label>
          <div css={{ margin: "2.5rem 1rem" }}>
            <input
              css={{
                border: "none",
                borderBottom: "1px solid #ccc",
                padding: ".5rem 1rem",
                fontSize: "1.2rem",
                boxSizing: "border-box",
                width: "100%",
                outline: "none",
                transition: "border-bottom-color 300ms ease",
                ":focus": {
                  borderBottomColor: "#7E00F3"
                }
              }}
              type="text"
              id="new-channel-name"
              name="channelName"
              placeholder="general"
              value={channelName}
              onChange={handleChange}
              autoFocus
            />
            {channels.includes(channelName.replace("#", "")) && (
              <label
                css={{ color: "red", display: "block", marginTop: "1rem" }}
                htmlFor="new-channel-name"
              >
                The channel <strong>{channelName}</strong> already exists.
              </label>
            )}
            {channelName.startsWith("#") && (
              <label
                css={{ color: "red", display: "block", marginTop: "1rem" }}
                htmlFor="new-channel-name"
              >
                You don't need to add a <strong>#</strong> at the beginning of a
                channel name.
              </label>
            )}
          </div>
          <button
            css={{
              backgroundColor: "#7E00F3",
              borderRadius: ".5rem",
              color: "white",
              width: "100%",
              padding: ".75rem .5rem",
              boxSizing: "border-box",
              fontSize: ".9rem",
              fontWeight: "500",
              textTransform: "uppercase",
              outline: "none"
            }}
            type="submit"
          >
            Create channel
          </button>
        </form>
      </dialog>
    </>
  );
}

export default CreateChannel;
