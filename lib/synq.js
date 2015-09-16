var browserSync = require('browser-sync');
var _ = require('lodash');

var instances = {};

var defaultOptions = {

};


function get(){

  Object.keys(instances).map(function(url){

    var bs = instances[url];

    return {
      url: url,
      running: bs.running,
      options: bs.instance.options
    }
  })
}

function remove(url){

  delete instances[url];
}

function start(url, cb){

  var bs = browserSync.create();

  bs.init(_.assign({}, defaultOptions, {proxy: url}), function(){

    bs.running = true;

    cb(bs.instance.options);
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




