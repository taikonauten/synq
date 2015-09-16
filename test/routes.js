var request = require('supertest');
var expect = require('chai').expect;

var app = require('../index.js');
var session = request.agent(app);

describe('POST /get', function(){

  it('should respond with an array', function(done){
    request(app)
      .post('/get')
      .send({url: null})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [], done);
  });

  it('should respond with a NOT FOUND error', function(done){
    request(app)
      .post('/get')
      .send({url: 'www.test.de'})
      .expect(404, done);
  });
});

describe('POST /start', function(){

  var body;

  it('should start an instance', function(done){
    session
      .post('/start')
      .send({url: 'https://www.reddit.com'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res){

        body = res.body;

        expect(body).to.have.all.keys('url', 'active', 'port', 'external');
      })
      .expect(200, done);
  });

  it('should get the same instance for the same url', function(done){
    session
      .post('/start')
      .send({url: 'https://www.reddit.com'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res){

        expect(res.body).to.deep.equal(body);
      })
      .expect(200, done);
  });

  it('should find the instance win the array', function(done){
    request(app)
      .post('/get')
      .send({url: null})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [body], done);
  });

  it('should return 400 for missing url', function(done){
    session
      .post('/start')
      .send()
      .set('Accept', 'application/json')
      .expect(400, done);
  });
});

describe('POST /stop', function(){


  it('should stop an instance', function(done){
    session
      .post('/stop')
      .send({url: 'https://www.reddit.com'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res){

        expect(res.body.active).to.equal(false);
      })
      .expect(200, done);
  });

  it('should return 400 for missing url', function(done){
    session
      .post('/start')
      .send()
      .set('Accept', 'application/json')
      .expect(400, done);
  });

  it('should return 500 invalid request for un', function(done){
    session
      .post('/stop')
      .send({url: 'https://test.de'})
      .expect(404, done);
  });
});

describe('POST /remove', function(){

  it('should remove an instance', function(done){
    session
      .post('/remove')
      .send({url: 'https://www.reddit.com'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [], done);
  });

  it('should return 500 invalid request', function(done){
    session
      .post('/stop')
      .send({url: 'https://www.test.com'})
      .expect(404, done);
  });

  it('should return 400 for missing url', function(done){
    session
      .post('/remove')
      .send()
      .set('Accept', 'application/json')
      .expect(400, done);
  });
});

