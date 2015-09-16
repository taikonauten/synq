
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

// index
app.get('/', function(req, res){

  res.render('index', {data: synq.get()})
});

// rest
app.post('/get', get);
app.post('/start', validate(start));
app.post('/stop', validate(stop));
app.post('/remove', validate(remove));

// start
app.listen(5000, function () {

  var addr = server.address();

  console.log('Example app listening at http://%s:%s', addr.host, addr.port);
});

// export for testing
module.exports = app;

/**
 * functions
 */

function get(req, res){

  var data = synq.get(req.body.url);

  if(!data)
    res.status(404);

  res.json(data);
}

function start(req, res){

  synq.start(req.body.url, function(instance){

    res.json(instance);
  });
}

function stop(req, res){

  synq.stop(req.body.url);

  return get(req, res);
}

function remove(req, res){

  synq.remove(req.body.url);

  delete req.body.url;

  return get(req, res);
}


function validate(next){

  return function(req, res){

    if(req.body.url)
      return next(req, res);

    res.status(400);
    res.send('Please Provide an URL');
  }
}



