const appError = require("./controllers/error.js").appError;
let io;
module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new appError("Socket.io not initialized!");
    }
    return io;
  },
};
