$(document).ready(function() {
    $('.fa-camera').on('click', function() {
        startWebCam(function (track) {
            stopDemo();
            toggleVisibility($('.camera'));
            toggleVisibility($('.fa-upload'));
            toggleVisibility($('.middle'));
            $('.fa-camera').on('click', function (e) {
                var photo = takePicture(e);
                track.stop();
                toggleVisibility($('.loader'));
                toggleVisibility($('.camera'));
                toggleVisibility($('.fa-camera'));
                postImage(photo, function (res) {
                    toggleVisibility($('.loader'));
                    toggleVisibility($('.snake'));
                    startSnake(res);
                });
            });
        });
    })
    $('.fa-upload').on('click', function() {
        stopDemo();
        $('.upload').trigger("click");
    })
});

handleFile = function (files) {
    console.log(files);
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
        var img = new Image();
        img.src = reader.result;

        var canvas = document.getElementById('photoCanvas');
        var context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        toggleVisibility($('.fa-camera'));
        toggleVisibility($('.middle'));
        toggleVisibility($('.fa-upload'));
        toggleVisibility($('.loader'));
        postImage(reader.result, function (res) {
            toggleVisibility($('.loader'));
            toggleVisibility($('.snake'));
            startSnake(res);
        });
    }, false);

    if (files[0]) {
        console.log(files[0]);
        reader.readAsDataURL(files[0]);
    }
}

toggleVisibility = function (element) {
    element.toggle()
};
