/* Import libraries */
var express = require('express');           // Used to manage Ports
var path = require('path');                 // Handle File Paths
var formidable = require('formidable');     // For HTTP Form Data
var fs = require('fs');                     // Manipulate Files

/* Global Vars */
var app = express();                        // Create Server Instance
var port = 3000;                            // Set Server Port

// Whenever browser requests additional files, go to /public folder
app.use(express.static(path.join(__dirname, 'public')));

// Send HTML when requesting access to website
app.get('/', function (req, res) {
    // Send files
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Revceice files and send progress data for mills
app.post('/mill', function (req, res) {
    // Save File
    saveFile('/mill', req, res);
});

// Revceice files and send progress data for lathes
app.post('/lathe', function (req, res) {
    // Save File
    saveFile('/lathe', req, res);
});

// Revceice files and send progress data for gantry
app.post('/gantry', function (req, res) {
    // Save File
    saveFile('/gantry', req, res);
});

// Revceice files and send progress data for water jet
app.post('/waterjet', function (req, res) {
    // Save File
    saveFile('/waterjet', req, res);
});

// Function for saving the file
function saveFile(loc, req, res) {
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, loc);

    // every time a file has been uploaded successfully, rename it to it's orignal name
    form.on('file', function (field, file) {
        // 2019 fs revision requires callback functions so () is empty function to be sent
        fs.rename(file.path, path.join(form.uploadDir, file.name), () => {});
    });

    // log any errors that occur
    form.on('error', function (err) {
        // Print Any Errors
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        // HTTP Reponse 200
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);
}

// Listen on Port
var server = app.listen(port, function () {
    // Print Server Running
    console.log('File Share Server running on port: ' + port);
});
