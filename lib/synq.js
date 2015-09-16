var browserSync = require('browser-sync');
var _ = require('lodash');

var instances = {};

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
    port: bs.instance.options.get('port'),
    external: bs.instance.options.get('urls').get('external')
  };
}

function remove(url){

  delete instances[url];
}

function start(url, cb){

  var bs = instances[url] || browserSync.create();

  if(bs.active)
    return process.nextTick(function(){ cb(get(url)) });

  bs.init(_.assign({}, defaultOptions, {proxy: url}), function(){

    cb(get(url));
  });

  instances[url] = bs;
}


function stop(url){

  var bs = instances[url];

  if(!bs) return;

  bs.exit();
}


// exports
module.exports.start = start;
module.exports.stop = stop;
module.exports.get = get;
module.exports.remove = remove;




