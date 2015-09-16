
var express = require('express');
var synq = require('./lib/synq');
var exphbs = require('express-handlebars');

var app = express();

app.engine('.hbs', exphbs({defaultLayout: 'single', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static('public'));


app.get('/', function(req, res){

  res.render('index', {})
});

app.get('/start/:url', function(req, res){

  synq.start(req.params.url, function(options){

    res.send(options.get('urls'));
  });
});

app.get('/stop/:url', function(req, res){

  synq.stop(req.params.url);

  res.send('ok');
});


app.get('/remove/:url', function(req, res){

  synq.remove(req.params.url);

  res.send('ok');
});





