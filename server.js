// This is the old one.
var config = require('../config');
var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');
var a1 = 0;
var a2 = 0;
var a3 = 0;
var a4 = 0;
var a5 = 0;

app.listen(config.serverPort);

console.log("ThixBotsV1.0.2")
console.log("Clone Bots 1.0.2")

io.on('connection', function(socket) {

    socket.on('login', function(data) {
        if (data.uuid != config.client_uuid) return;
        /*console.log("User connected with id:" + "qyuXlxCOLL5lcld");
        socket.room = "qyuXlxCOLL5lcld";
        socket.join("qyuXlxCOLL5lcld");*/
        console.log("Login UUID : " + data.uuid);
        socket.room = data.uuid;
        socket.join(data.uuid);
        if (data.type == "server") {
            io.sockets.in(socket.room).emit("force-login", "server-booted-up");
        }

    });

    socket.on('pos', function(data) {
        //console.log(socket.room + " : " + data);
        io.sockets.in(socket.room).emit('pos', data);
    });

    socket.on('cmd', function(data) {
        console.log(data);
        io.sockets.in(socket.room).emit('cmd', data);
    });

    socket.on("spawn-count", function(data) {
        io.sockets.in(socket.room).emit("spawn-count", data);
    });

    socket.emit("force-login", "startup");

});