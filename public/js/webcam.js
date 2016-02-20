    var image;
    $(document).ready(function() {
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



        startbutton.addEventListener('click', function(e) {
            var context = canvas.getContext('2d');
            var height = video.videoHeight;
            var width = video.videoWidth;
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            var data = context.getImageData(0,0,width,height).data;
            // console.log(data.data);
            $.ajax({
               url: '/image',
               type: 'POST',
               contentType: 'application/octet-stream',
               data: data,
               processData: false,
               success: function (res) {
                   console.log("cool");
               },
               error: function (err) {
                   console.log(err);
               }
            });
            e.preventDefault();
        }, false);
    })
