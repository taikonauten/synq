
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// index
app.get('/', routes.index);

// reactive routes
//app.get('/react', routes.index);

// REST
app.post('/get', routes.get);
app.post('/start', routes.start);
app.post('/stop', routes.stop);
app.post('/add', routes.add);
app.post('/remove', routes.remove);

// start
var server = app.listen(5000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

// export for testing
module.exports = app;
