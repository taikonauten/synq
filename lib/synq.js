var browserSync = require('browser-sync');
var _ = require('lodash');

var instances = {};

var defaultOptions = {

};


function get(url){

  if(url)
    return getOne(url);

  return Object.keys(instances).map(getOne);
}


function getOne(url){

  var bs = instances[url];

  return {
    url: url,
    running: bs.running,
    port: bs.instance.options.get('port'),
    external: bs.instance.options.get('urls').get('external')
  }
}

function remove(url){

  delete instances[url];
}

function start(url, cb){

  var bs = browserSync.create();

  bs.init(_.assign({}, defaultOptions, {proxy: url}), function(){

    bs.running = true;

    cb(get(url));
  });

  instances[url] = bs;
}


function stop(url){

  var bs = instances[url];

  if(!bs) return;

  bs.running = false;

  bs.exit();
}


// exports
module.exports.start = start;
module.exports.stop = stop;
module.exports.get = get;
module.exports.remove = remove;




