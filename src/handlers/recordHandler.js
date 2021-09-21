const _ = require('underscore');
const records = {};

module.exports = (io, socket) => {
  const registerRecord = (record) => {
    records[socket.id] = record;
  };

  const unregisterRecord = () => {
    delete records[socket.id];
  };

  const syncRecord = (data) => {
    // ...
  };

  const editRecord = (data) => {
    _.each(records, (record, socketId) => {
        if (socketId !== socket.id &&
          record.moduleName === data.moduleName &&
          record.recordId === data.recordId) {
            io.to(socketId).emit('record:edit', data);
        }
    });
  };

  const deleteRecord = (data) => {
    // ...
  };

  socket.on("record:register", registerRecord);
  socket.on("record:unregister", unregisterRecord);
  socket.on("disconnect", unregisterRecord);
  socket.on("record:sync", syncRecord);
  socket.on("record:edit", editRecord);
  socket.on("record:delete", deleteRecord);
}

