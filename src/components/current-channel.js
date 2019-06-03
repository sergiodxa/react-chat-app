/** @jsx jsx */
import { jsx } from "@emotion/core";

function CurrentChannel({ channel }) {
  return (
    <div
      css={{
        display: "flex",
        padding: "1rem .5rem",
        boxSizing: "border-box",
        height: "4rem",
        alignItems: "center"
      }}
    >
      <strong css={{ fontSize: "1.2rem", fontWeight: 500 }}>
        # {channel}
      </strong>
    </div>
  );
}

export default CurrentChannel;
