require('dotenv').config();
const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000
const server = http.createServer(app);
const version = require("./package.json").version;

const io = require("socket.io")();
io.attach(server, {
  maxHttpBufferSize: 1e9,
});

io.on("connection", (socket) => {
  console.log("conneciton added")
  socket.on("sampleEndpoint", (params, callback) => {
    // Do something
    console.log("sampleEndpoint");
    fibonacci(30) // generate cpu intensive task
    callback("response");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server@${version} running on: ${port}`);
});




function fibonacci(n) {
  if (n <= 1) {
      return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}