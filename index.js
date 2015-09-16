
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var synq = require('./lib/synq');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function(req, res){

  res.render('index', {data: synq.get()})
});

app.post('/get', function(req, res){

  res.json(synq.get(req.body.url));
});


app.post('/start', function(req, res){

  synq.start(req.body.url, function(instance){

    res.json(instance);
  });
});

app.post('/stop', function(req, res){

  synq.stop(req.body.url);

  res.send('ok');
});


app.post('/remove', function(req, res){

  synq.remove(req.box.url);

  res.send('ok');
});

var server = app.listen(5000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


