var config = require('./config');
var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');
var change = false;
var databuf = null;
var s = null;
var idf = 0;
require("colors");
app.listen(config.serverPort);





function load() {
    var figlet = require('figlet');
    figlet('ThixBots', function (err, data) {
        console.log(data);
        console.log('               V1.0.2');
		
          console.log(("[PORT] ").green + ("Started on Port:" + config.serverPort).white);
			console.log(('[INFO] ').green + ('Clone Bots by AgarThix!').white);
            console.log(('[INFO] ').green + ('Sucessfully started!').white);
			console.log(('[VERSION] ').red + ('Current version : ').white+('1.0.2').white);
			console.log(('[UPDATES] ').red + ('No Updates!').white);
			console.log(('[STATUS] ').green + ('Ready! :)').green);
			console.log(('').green + ('----------------------------------------').white);
			
			
            
			
			function a () {
				

			}
			
			setTimeout(a, 1000);
			
			
    });
}



io.on('connection', function(socket) {

	var cli = {};

  socket.on('login', function(data) {
	
	cli = data
	
    console.log(("CONNECTING...").green + ("Succesful Connected with UUID:  " + data.uuid).white);
    socket.room = data.uuid;
    socket.join(data.uuid);

    if (data.type == "server") {      
      io.sockets.in(socket.room).emit("force-login", "server-booted-up");
	  idf = 0;
    }

  });

  socket.on('pos', function(data) {

    io.sockets.in(socket.room).emit('pos', data);
	
  });
  
    socket.on('size', function(data) {
	  
    io.sockets.in(socket.room).emit('pos', data);
	
  });
  
  socket.on('close', function(data) {
    
	clearInterval(s);
	socket.room = null;
    socket.leave();
	socket.conn.close();

	s = null;
	
  });
  
  socket.on('disconnect', function(data) {
    
	clearInterval(s);
	socket.room = null;
    socket.leave();
	socket.conn.close();

	s = null;
	
  });
  

  
  function send(val) {
	  
	  idf++;
	  console.log(idf);
	  if (idf == 1) { // 2 <= 1
		  s = setInterval(function() {
			if (change == false) {
				
				io.sockets.in(socket.room).emit('buf', databuf);
				
			}else{
				
				change = true;
				clearInterval(s);
				
			}
			
		}, 1000);
		
	}  
	
}
  
  
  socket.on('buf', function(data) {
    
	databuf = data;
	console.log(data);
	send(1);
	
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

load();

require("./cmd.js");



