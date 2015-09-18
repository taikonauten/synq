var request = require('supertest');
var expect = require('chai').expect;
var _ = require('lodash');

var app, session;

describe('TEST Routes', function(){

  before(function(done) {

    var db = require('../lib/db');

    db.destroy('test', function(){

      db.setPath('test');

      // launch the app
      app = require('../index.js');
      session = request.agent(app);

      done();
    });
  });


  describe('POST /add', function(){

    it('should respond with an array', function(done){
      request(app)
        .post('/add')
        .send({url: 'https://www.reddit.com'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res){

          expect(res.body).to.have.all.keys('url', 'active', 'qr');
          expect(res.body.url).to.equal('https://www.reddit.com');
          expect(res.body.active).to.equal(false);
        })
        .expect(200, done);
    });

    it('should respond with a NOT FOUND error', function(done){
      request(app)
        .post('/add')
        .send()
        .expect(400, done);
    });
  });

  describe('POST /get', function(){

    it('should respond with an array', function(done){
      request(app)
        .post('/get')
        .send({url: null})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res){

          var instance = res.body[0];

          expect(instance).to.have.all.keys('url', 'active', 'qr');
          expect(instance.url).to.equal('https://www.reddit.com');
          expect(instance.active).to.equal(false);
        })
        .expect(200, done);
    });

    it('should respond with a NOT FOUND error', function(done){
      request(app)
        .post('/get')
        .send({url: 'www.whatever.com'})
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

          expect(body).to.have.all.keys('url', 'active', 'port', 'external', 'qr');
          expect(body.active).to.equal(true);
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

          var instance = res.body;

          expect(res.body).to.have.all.keys('url', 'active', 'qr','port', 'external');
          expect(res.body.url).to.equal(body.url);
          expect(res.body.active).to.equal(body.active);
        })
        .expect(200, done);
    });

    it('should find the instance win the array', function(done){
      request(app)
        .post('/get')
        .send({url: null})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res){

          expect(_.pluck(res.body, 'url')).to.contain(body.url);
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
        .send({url: 'https://www.test.com'})
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
        .expect(function(res){

          expect(_.pluck(res.body, 'url')).to.not.contain('https://www.reddit.com');
        })
        .expect(200, done);
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
  })
})

