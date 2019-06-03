/** @jsx jsx */
import { jsx } from "@emotion/core";

function Channel({ name, onClick, isActive = false }) {
  function handleClick(event) {
    onClick(name);
    event.target.blur();
  }

  return (
    <div css={{ backgroundColor: isActive ? "#783CEE" : "none" }}>
      <button
        aria-label={`Change to channel ${name}`}
        css={{
          background: "none",
          border: "none",
          color: isActive ? "white" : "black",
          cursor: "pointer",
          fontSize: "1rem",
          padding: ".5rem",
          outline: "none",
          textAlign: "left",
          width: "100%"
        }}
        onClick={handleClick}
      >
        # {name}
      </button>
    </div>
  );
}

export default Channel;
