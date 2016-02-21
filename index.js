var express = require('express');
var app = express();
var url = require('url');
var fs = require('fs');
const spawn = require('child_process').spawn;
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
var bodyParser = require('body-parser');
//var stream = require('stream');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(bodyParser.raw({ // to support URL-encoded bodies
    limit: '5MB',
    type: 'application/octet-stream'
}));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    var query = url.parse(request.url, true).query;
    args = {
        canvasWidth: query.canvasWidth || 500,
        canvasHeight: query.canvasHeight || 500
    }
    response.render('pages/index', args);
});

app.post('/', function(request, response) {
    var img_data = request.body.toString() ;
    var base64Data = img_data.replace(/^data:image\/png;base64,/, "");
    var fname = 'tmp/' + Date.now().toString() +'.png'
    fs.writeFile(fname, base64Data, 'base64', function (err) {
        var imgStream = fs.createReadStream(fname)
        var child = spawn('python',['-W ignore','python-script/cam_edge.py'], {
            stdio: 'pipe'
        });
        imgStream.pipe(child.stdin);

        var outputString = '';

        child.stdout.on('data', function (data) {
            outputString += data.toString();
        });

        child.stderr.on('data', function (data) {
            console.log("error: "+data);
            var payload = {
                error: true
            }
            response.send(payload);
        });

        child.on('close', function (code) {
            console.log('child process exited with code ' + code + ' and length ' + outputString.length);
            fs.unlink(fname);
            var payload = {
                data: outputString
            }
            response.send(payload);
        });
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
