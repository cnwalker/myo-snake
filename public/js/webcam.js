startWebCam = function (callback) {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var photo = document.getElementById('photo');
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
        },
        function(err) {
            console.log("An error occured! " + err);
        }
    );
    video.addEventListener('canplay', function (e) {
        callback();
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
        success: function(res) {
            startSnake(res);
        },
        error: function(err) {
            // TODO
            console.log(err);
            handleError(err);
        }
    });
}

startSnake = function (data) {
    snake_init();

}
