
var ee = require('event-emitter');
var synq = require('../lib/synq');
var controller = ee({});


var state;

controller.setState = function(s){

  state = s;
};

var methods = ['add', 'start', 'stop', 'remove'];

methods.forEach(function(method){

  controller[method] = function(value, callback){

    synq[method](value, function(err, resp){

      if(err) return console.log(err);

      if(callback) callback(resp.body);

      controller.emit('get', resp.body);

      synq.get(null, function(err, resp){

        if(err) return console.log(err);

        console.log(resp.body);

        controller.emit('change', resp.body);
      })
    });
  }
});



module.exports = controller;