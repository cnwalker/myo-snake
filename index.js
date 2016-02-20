var express = require('express');
var app = express();
var url = require('url');
var exec = require('child_process').exec;
var bodyParser = require('body-parser');

app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.raw({     // to support URL-encoded bodies
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

    // var args = [ './child.js' ];
    // var child = spawn(process.execPath, args, { stdio: ['pipe', 1, 2, 'ipc'] });
    // img_data.pipe(child.stdin);
     exec(__dirname + '/python_script.py', function(error, stdout, stderr) {
      if (error) {
        console.log(error);
      }
      console.log(callback(JSON.parse(stdout)));
  });
    response.send(JSON.stringify({
        canvasWidth: 100,
        canvasHeight: 200
    }));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
