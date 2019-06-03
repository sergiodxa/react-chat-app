/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

function LoginView({ onUsername }) {
  const [content, setContent] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onUsername(content);
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  return (
    <main
      css={{
        background: "#CAD1E0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%"
      }}
    >
      <form
        css={{
          backgroundColor: "white",
          borderRadius: ".5rem",
          padding: "2rem 1rem",
          width: "80%",
          maxWidth: 360
        }}
        onSubmit={handleSubmit}
      >
        <h1 css={{ margin: 0, fontWeight: "500", textAlign: "center" }}>
          Welcome to Tutopia
        </h1>
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
            aria-label="Enter your username"
            placeholder="sergio"
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            autoFocus
          />
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
          Login In
        </button>
      </form>
    </main>
  );
}

export default LoginView;
