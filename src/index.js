const { Server } = require("socket.io");

const io = new Server({ /* options */ });

const registerRecordHandlers = require("./handlers/recordHandler");

const onConnection = (socket) => {
  registerRecordHandlers(io, socket);
}

io.on("connection", onConnection);

io.listen(3000);
