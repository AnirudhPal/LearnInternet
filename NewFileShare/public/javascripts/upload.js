/* Global Var */
var device = '';  //Variable to track device

// Function for Mill Upload
function millUpload() {
    // Set device
    device = '/mill';

    // Clear and Run
    clearRun();
}

// Function for Lathe Upload
function latheUpload() {
    // Set device
    device = '/lathe';

    // Clear and Run
    clearRun();
}

// Function for Gantry Upload
function gantryUpload() {
    // Set device
    device = '/gantry';

    // Clear and Run
    clearRun();
}

// Function for Waterjet Upload
function waterjetUpload() {
    // Set device
    device = '/waterjet';

    // Clear and Run
    clearRun();
}

// Function for Clearing Progress Bar
function clearRun() {
    // Trigger input
    $('#upload-input').click();

    // Clear Progress Bar
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');

    // Print statement
    console.log('Sending File to ' + device);
}

// Allows user to send data to server
$('#upload-input').on('change', function () {
    // Get files that are associated with the input
    var files = $(this).get(0).files;

    // Only proceed if there is more than one file selected
    if (files.length > 0) {
        // Filter file types to accept only .nc, .dxf, .ord
        for (var i = 0; i < files.length; i++) {
            // Get individual file
            var file = files[i];

            // Extract File Type
            var fileExtension = file.name.split('.').pop();

            // Limit file types to .nc, .dxf, .ord, .mp4 for upload
            if (fileExtension != 'nc' && fileExtension != 'dxf' && fileExtension != 'ord' && fileExtension != 'mp4') {
                // Exit function
                return;
            }
        }

        // create a FormData object which will be sent as the data payload in the AJAX request
        var formData = new FormData();

        // loop through all the selected files and add them to the formData object
        for (var i = 0; i < files.length; i++) {
            // Get file type
            var file = files[i];

            // Extract File Type
            var fileExtension = file.name.split('.').pop();

            // Handle NC for NGC FNC run
            if (fileExtension == 'nc') {
                // Print
                console.log('Adding o to nc file');

                // add the nc files to formData object for the data payload
                formData.append('uploads[]', file, 'o' + file.name);
            }
            else {
                // add the files to formData object for the data payload
                formData.append('uploads[]', file, file.name);
            }
        }

        // Creating an AJAX object
        $.ajax({
            url: device,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log('Upload Successful :)\n' + data);
            },
            xhr: function () {
                // create an XMLHttpRequest
                var xhr = new XMLHttpRequest();

                // listen to the 'progress' event
                xhr.upload.addEventListener('progress', function (evt) {
                    // If it can have numeric length
                    if (evt.lengthComputable) {
                        // calculate the percentage of upload completed
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);

                        // update the Bootstrap progress bar with the new percentage
                        $('.progress-bar').text(percentComplete + '%');
                        $('.progress-bar').width(percentComplete + '%');

                        // once the upload reaches 100%, set the progress bar text to done
                        if (percentComplete === 100) {
                            $('.progress-bar').html('Go to the machine if you dare...');
                        }
                    }
                }, false);
                return xhr;
            }
        });
    }
});
