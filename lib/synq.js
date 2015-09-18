var browserSync = require("browser-sync");
var db = require('./db');
var _ = require('lodash');

var instances = {};

// this is dangerous async
db.get(function(err, urls){

  if(err) console.log(err);
  if(!urls) return;

  urls.forEach(function(url){

    instances[url] = {
      url: url,
      active: false
    }
  })
});

var defaultOptions = {

  open: false
};


function get(url){

  if(url)
    return getOne(url);

  return Object.keys(instances).map(getOne);
}


function getOne(url){

  var bs = instances[url];

  if(!bs) return;

  return {
    url: url,
    active: bs.active,
    port: bs.instance && bs.instance.options.get('port'),
    external: bs.instance && bs.instance.options.get('urls').get('external')
  };
}

function add(url, callback){

  instances[url] = {
    url: url,
    active: false
  };

  save(callback);
}

function remove(url){

  delete instances[url];
  save();
}

function start(url, cb){

  var bs = instances[url];

  if(bs && bs.active)
    return process.nextTick(function(){ cb(get(url)) });

  if(bs && bs.instance)
    return bs.resume();

  bs = browserSync.create();
  bs.init(_.assign({}, defaultOptions, {proxy: url}), function(){

    cb(get(url));
  });

  instances[url] = bs;
  save();
}


function stop(url){

  var bs = instances[url];

  if(!bs) return;

  bs.exit();
}


function save(callback){

  db.put(Object.keys(instances), callback);
}


// exports
module.exports.start = start;
module.exports.stop = stop;
module.exports.get = get;
module.exports.remove = remove;
module.exports.add = add;
