var levelup = require('level');
var db = levelup('./db', {valueEncoding: 'json'});

var key = 'urls';

module.exports.put = function(data, callback){

  db.put(key, data, callback);
};

module.exports.get = function(callback){

  db.get(key, {sync: true}, callback);
};