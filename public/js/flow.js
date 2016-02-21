$(document).ready(function() {
    $('.fa-camera').on('click', function() {
        console.log("camera");
        startWebCam(function (track) {
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
        console.log("upload");
        $('.upload').trigger("click");
    })
});

handleFile = function (files) {
    console.log(files);
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
        toggleVisibility($('.fa-camera'));
        toggleVisibility($('.or'));
        toggleVisibility($('.fa-upload'));
        toggleVisibility($('.loader'));
        postImage(reader.result, function (res) {
            toggleVisibility($('.loader'));
            toggleVisibility($('.snake'));
            startSnake(res);
        });
    }, false);

    if (files[0]) {
        reader.readAsDataURL(files[0]);
    }
}

toggleVisibility = function (element) {
    element.toggle()
};
