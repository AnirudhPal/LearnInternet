// Import a Standard Library Reference
var http = require('http');

// Create a Server
http.createServer(function (req, res) {
	res.write('Hello World!'); //write a response to the client
	res.end(); //end the response
}).listen(8080); // Host on 8080 Port
