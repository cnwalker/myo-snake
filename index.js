var express = require('express');
var app = express();
var url = require('url');
const spawn = require('child_process').spawn;
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
    var imgStream = new stream.PassThrough();
    var img_data = request.body;
    //imgStream.end(img_data);
    var child = spawn('python',[__dirname + '/python-script/test.py'], {
        stdio: 'pipe'
    });
    //imgStream.pipe(child.stdin);

    child.stdout.on('data', function(data) {
        console.log("stdout");
        // response.send(data);
    });

    child.stderr.on('data', function(data) {
        console.log("Error:" + data);
        // response.send(data);
    });

    child.on('close', function(code) {
        response.send(code);
    });

});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
