$(document).ready(function() {
    $('.fa-camera').on('click', function() {
        console.log("camera");
        startWebCam(function () {
            toggleVisibility($('.camera'))
            toggleVisibility($('.fa-upload'))
            toggleVisibility($('.or'))
            $('.fa-camera').on('click', funcation (e) {
                var photo = takePicture(e);
                postImage(photo);
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
