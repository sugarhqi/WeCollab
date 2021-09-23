const _ = require('underscore');
const records = {};

module.exports = (io, socket) => {
  const _emit = (event, data) => {
    //console.log(JSON.stringify(records));
    _.each(records, (record, socketId) => {
      if (socketId !== socket.id &&
        record.view === data.view &&
        record.moduleName === data.moduleName &&
        record.recordId === data.recordId) {
          io.to(socketId).emit(event, data);
      }
    });
  };

  const registerRecord = (record) => {
    console.log('register:' + JSON.stringify(record));
    records[socket.id] = record;
  };

  const unregisterRecord = () => {
    console.log('unregister:' + socket.id);
    if (records[socket.id]) {
      _emit('record:unregister', records[socket.id]);
      delete records[socket.id];
    }
  };

  const syncRecord = (data) => {
    console.log('sync:' + JSON.stringify(data));
    _emit('record:sync', data);
  };

  const editRecord = (data) => {
    console.log('edit:' + JSON.stringify(data));
    _emit('record:edit', data);
  };

  const deleteRecord = (data) => {
    console.log('delete:' + JSON.stringify(data));
    _emit('record:edit', data);
  };

  socket.on("record:register", registerRecord);
  socket.on("record:unregister", unregisterRecord);
  socket.on("disconnect", unregisterRecord);
  socket.on("record:sync", syncRecord);
  socket.on("record:edit", editRecord);
  socket.on("record:delete", deleteRecord);
}

