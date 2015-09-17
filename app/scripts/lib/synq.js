
import request from 'browser-request';

const POST_METHODS = ['get', 'start', 'stop', 'add', 'remove'];

// create Posts
POST_METHODS.forEach((method) => exports[method] = createPost(method));

function createPost(method){

  return function(url, callback){

    request({
      method: 'POST',
      url:`/${method}`,
      json: {url}
    }, callback)
  }
}
