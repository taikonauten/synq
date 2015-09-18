
var ee = require('event-emitter');
var _ = require('lodash');
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

      controller.emit(method, resp.body);
      controller.emit('change', changeState(method, value, resp.body));
    });
  }
});

function changeState(method, url, data){

  if(method == 'add'){

    state = state.concat(data);
  }

  if(method == 'remove'){

    state = state.filter(function(s){ return s.url !== url});
  }


  if(method == 'start' || method == 'stop'){

    upsert(state, {url:url}, data)
  }


  return state;
}


function upsert(arr, key, newval) {

  var match = _.find(arr, key);

  if(match){

    var index = _.indexOf(arr, _.find(arr, key));
    arr.splice(index, 1, newval);

  } else {

    arr.push(newval);
  }
};

module.exports = controller;