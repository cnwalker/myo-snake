$(document).ready(function() {
    $('.fa-camera').on('click', function() {
        console.log("camera");
        startWebCam(function () {
            toggleVisibility($('.camera'));
            toggleVisibility($('.fa-upload'));
            toggleVisibility($('.or'));
            $('.fa-camera').on('click', function (e) {
                var photo = takePicture(e);
                toggleVisibility($('.loader'));
                toggleVisibility($('.camera'));
                toggleVisibility($('.fa-camera'));
                postImage(photo, function () {
                    toggleVisibility($('.loader'));
                    toggleVisibility($('.snake'));
                });
            });
        });
    })
    $('.fa-upload').on('click', function() {
        console.log("upload");
    })
});

toggleVisibility = function (element) {
    element.toggle()
};
