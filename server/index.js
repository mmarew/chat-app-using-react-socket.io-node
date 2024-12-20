const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const router = require("./router");

const app = express();
app.use(cors());
const server = http.createServer(app);
// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"], // React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(router);

io.on("connection", (socket) => {
  console.log("@connection", socket.id);
  console.log("Total active connections:", io.sockets.sockets.size);

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);
    console.log(`User joined room: ${user.room}`, user);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", { user: user.name, text: message });
      callback();
    } else {
      console.error("User not found for socket.id:", socket.id);
    }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log("@disconnect socket.id", socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }

    console.log(
      "Total active connections after disconnect:",
      io.sockets.sockets.size
    );
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started on 5000.`)
);
