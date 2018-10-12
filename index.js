const path = require("path");
const express = require("express");
const app = express();



// settings
app.set("port", process.env.PORT || 3000); 

// files
app.use(express.static(path.join(__dirname, "public")));

// start
const server = app.listen(app.get("port"), () => {
    console.log("server on port", app.get("port"));
})

const socketio = require("socket.io");
const io = socketio(server);

// websockets
io.on("connection", (socket) => {
    console.log("new connection", socket.id);
    socket.on('chat:message', (data) => {
        io.sockets.emit("chat:message", data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit("chat:typing", data);
    });
});















// console.log(path.join(__dirname, "public"));