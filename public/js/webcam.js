startWebCam = function (callback) {
    var video = document.getElementById('video');
    var canvas = document.getElementById('photoCanvas');
    var photo = document.getElementById('photo');
    var track;
    navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
    navigator.getMedia({
            video: true,
            audio: false
        },
        function(stream) {
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL.createObjectURL(stream);
            }
            video.play();
            track = stream.getTracks()[0];
        },
        function(err) {
            console.log("An error occured! " + err);
        }
    );
    video.addEventListener('canplay', function (e) {
        callback(track);
    });
}

stopWebCam = function () {
    navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
    navigator.getMedia({
            video: false,
            audio: false
        },function() {
            console.log("stopped");
        },function(err) {
            console.log("Error stopping web cam: " + err);
        });
}

takePicture = function(e) {
    var context = canvas.getContext('2d');
    var height = video.videoHeight;
    var width = video.videoWidth;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    // var data = context.getImageData(0, 0, width, height).data;
    var dataURL = canvas.toDataURL();
    e.preventDefault();
    return dataURL;
};

postImage = function (data, callback) {
    $.ajax({
        url: '/',
        type: 'POST',
        contentType: 'application/octet-stream',
        data: data,
        processData: false,
        success: callback,
        error: function(err) {
            alert('Something went wrong with processing your image.');
        }
    });
}

startSnake = function (data) {
    snake_init();
}
