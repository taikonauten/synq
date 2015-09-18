var levelup = require('level');
var resolve = require('path').resolve;

var key = 'urls';

var path;
var db;

// initial path
setPath('dev');

module.exports.getDB = getDB;
module.exports.setPath = setPath;
module.exports.destroy = destroy;
module.exports.put = put;
module.exports.get = get;

function getDB(){

  return db;
}

function setPath(p){

  if(db)
    db.close();

  path = resolve(__dirname, '../db/', p);
  db = levelup(path, {valueEncoding: 'json'});
}

function destroy(p, callback){

  require('leveldown')
    .destroy(resolve(__dirname, '../db/', p), callback);
}

function put(data, callback){

  db.put(key, data, callback);
}

function get(callback){

  db.get(key, {sync: true}, callback);
}

