var express = require('express');
var app = express();
var bodyParser = require('body-parser')

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
  response.render('pages/index');
});

app.post('/image', function(request, response) {
    console.log(request.body)
    response.send('cool');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
