const http = require("http");
const handler = require("serve-handler");
const WebSocket = require("ws");
const { resolve } = require("path");

const PORT = parseInt(process.env.PORT, 10) || 3000;

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: resolve("./dist")
  });
});

const wss = new WebSocket.Server({ server });

wss.on("connection", socket => {
  socket.isAlive = true;

  socket.on("pong", () => {
    socket.isAlive = true;
  });

  socket.on("message", message => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  setInterval(() => {
    wss.clients.forEach(client => {
      if (client.isAlive === false) {
        return client.terminate();
      }

      client.isAlive = false;
      client.ping(() => {});
    });
  }, 30000);
});

server.listen(PORT, () => {
  console.log("> Running on http://localhost:%s", PORT);
});
