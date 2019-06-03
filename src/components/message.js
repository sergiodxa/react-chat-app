/** @jsx jsx */
import { jsx } from "@emotion/core";
import format from "date-fns/format";

function Message({ username, date, content, now, isActive = true }) {
  return (
    <article
      css={{
        padding: "1rem 1.5rem",
        borderBottom: "1px solid #eaeaea",
        ...(now > date ? { opacity: ".5" } : {}),
        ":last-child": { borderBottom: "none" }
      }}
    >
      <div>
        <strong css={{ fontSize: "1.1rem" }}>{username}</strong>{" "}
        <em css={{ fontSize: ".75rem", fontStyle: "normal", color: "#666" }}>
          {format(date, "HH:mm:ss")}
        </em>
      </div>
      <p css={{ margin: ".5rem 0 0" }}>{content}</p>
    </article>
  );
}

export default Message;
