const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  // ...
});
const registerRecordHandlers = require("./handlers/recordHandler");

const onConnection = (socket) => {
  registerRecordHandlers(io, socket);
}

io.on("connection", onConnection);

httpServer.listen(3000);
