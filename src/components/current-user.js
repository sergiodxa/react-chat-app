/** @jsx jsx */
import { jsx } from "@emotion/core";

function CurrentUser({ username }) {
  return (
    <div css={{ display: "flex", padding: "1rem .5rem", alignItems: "center" }}>
      <figure
        css={{
          backgroundColor: "#DCDCDC",
          borderRadius: ".25rem",
          height: "2rem",
          margin: 0,
          marginRight: ".25rem",
          padding: 0,
          width: "2rem"
        }}
      />
      <strong css={{ fontWeight: 500 }}>{username}</strong>
    </div>
  );
}

export default CurrentUser;
