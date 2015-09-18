var browserSync = require("browser-sync");
var QRCode = require('qrcode');
var db = require('./db');
var _ = require('lodash');

var instances = {};

// this is dangerous async
db.get(function(err, data){

  if(err) console.log(err);
  if(!data) return;

  instances = data;
});

var defaultOptions = {

  open: false
};


function createInitial(url, callback){

  callback({

    url: url,
    active: false
  })
}

function copy(instance){

  var bs = instance.bs;
  var data = {

    url: instance.url,
    active: false
  };

  if(bs){

    data.active = bs.active;
    data.qr = instance.qr;
    data.port = bs.instance && bs.instance.options.get('port');
    data.external = bs.instance && bs.instance.options.get('urls').get('external');
  }

  return data;
}

function get(url){

  if(url)
    return getOne(url);

  return Object.keys(instances).map(getOne);
}


function getOne(url){

  var instance = instances[url];

  if(!instance) return;

  return copy(instance);
}

function add(url, callback){

  createInitial(url, function(instance){

    instances[url] = instance;

    save(callback);
  })

}

function remove(url){

  delete instances[url];
  save();
}

function start(url, cb){

  var instance = instances[url];

  if(!instance)
    return;

  if(instance && instance.active)
    return process.nextTick(function(){ cb(get(url)) });

  instance.bs = browserSync.create();
  instance.bs.init(_.assign({}, defaultOptions, {proxy: url}), function(){

    QRCode.toDataURL(instance.bs.instance.options.get('urls').get('external'), function(err, qr){

      if(err) throw err;

      instance.qr = qr;

      cb(get(url))
    });
  });

  save();
}


function stop(url){

  var instance = instances[url];

  if(!instance) return;

  delete instance.qr;

  instance.bs.exit();
}


function save(callback){

  var data = {};

  _.forEach(instances, function(v, k){

    data[k] = {
      url: v.url,
      qr: v.qr
    };
  });

  db.put(data, callback);
}


// exports
module.exports.start = start;
module.exports.stop = stop;
module.exports.get = get;
module.exports.remove = remove;
module.exports.add = add;
