var JSX = require('node-jsx').install({extension: '.jsx'});
var React = require('react');

var synq = require('../lib/synq');

var App = React.createFactory(require('../common/app.jsx'));

// exports
module.exports._index = _index;
module.exports.index = index;
module.exports.get = get;
module.exports.start = validate(start);
module.exports.stop = validate(stop);
module.exports.add = validate(add);
module.exports.remove = validate(remove);

function _index(req, res){

  res.render('index', {data: synq.get()});
}

function index(req, res) {

  var synqList = React.renderToString(App({data: synq.get()}));

  res.render('index', {

    synqList: synqList
  });
}

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


function add(req, res){

  synq.add(req.body.url);

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

