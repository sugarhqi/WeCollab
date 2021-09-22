const _ = require('underscore');
const records = {};

module.exports = (io, socket) => {
  const registerRecord = (record) => {
    console.log('register:' + JSON.stringify(record));
    records[socket.id] = record;
  };

  const unregisterRecord = () => {
    console.log('unregister:' + socket.id);
    delete records[socket.id];
  };

  const syncRecord = (data) => {
    // ...
  };

  const editRecord = (data) => {
    console.log('edit:' + JSON.stringify(data));
    _.each(records, (record, socketId) => {
        if (socketId !== socket.id &&
          record.view === data.view &&
          record.moduleName === data.moduleName &&
          record.recordId === data.recordId) {
            console.log('emit:' + JSON.stringify(data));
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

