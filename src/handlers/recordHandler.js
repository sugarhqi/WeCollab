module.exports = (io, socket) => {
  const syncRecord = (payload) => {
    // ...
  }

  const editRecord = (payload) => {
    // ...
  }

  const deleteRecord = (payload) => {
    // ...
  }

  socket.on("record:sync", syncRecord);
  socket.on("record:edit", editRecord);
  socket.on("record:delete", deleteRecord);
}
