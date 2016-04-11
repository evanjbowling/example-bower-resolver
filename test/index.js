var assert = require('assert');
var mock = require('mock-require');

var mkdirSyncCalled=0;
var writeFileSyncCalled=0;
// mock the 'fs' module
mock('fs', { mkdirSync: function() {
    console.log('in mkdirSync');
    mkdirSyncCalled++;
  },
  writeFileSync : function() {
    console.log('in writeFileSync');
    writeFileSyncCalled++;
  }
});

var index = require('../src/index');

// tests for the resolver factory
describe('resolver', function() {
  var loggerInfoCalled = 0;
  var bowerMock = {
    logger : {
      info : function() {
        loggerInfoCalled++;
      }
    }
  };

  describe('#match()', function () {
    it('should return true when a valid url is tested', function () {
      var resolver = index(bowerMock);
      assert.equal(true,resolver.match("example://apple"));
      assert.equal(true,resolver.match("ex://apple"));
    });

    it('should return false when an invalid url is tested', function () {
      var resolver = index(bowerMock);

      // it should fail for other protocols
      assert.equal(false,resolver.match("svn://one"));
      assert.equal(false,resolver.match("git://one"));
      assert.equal(false,resolver.match("http://one"));
      assert.equal(false,resolver.match("https://one"));

      // it should fail for empty url
      assert.equal(false,resolver.match("example://"));
    });
  });

  describe('#fetch()', function () {
    beforeEach(function() {
      mkdirSyncCalled=0;
      writeFileSyncCalled=0;
    });

    it('should return an object in expected format', function () {
      var resolver = index(bowerMock);
      var result = resolver.fetch("example://apple");
      assert.equal('object',typeof result);
      assert.equal(true,result.hasOwnProperty('tempPath'));
      assert.equal(true,result.hasOwnProperty('removeIgnores'));
    });

    it('should use bower logger while fetching contents', function () {
      var resolver = index(bowerMock);
      var result = resolver.fetch({name:"example://apple"});
      assert.equal(true,loggerInfoCalled > 0);
    });

    it('should create temporary directory for bower components', function () {
      var resolver = index(bowerMock);
      var result = resolver.fetch({name:"example://apple"});
      console.log('mkdirSyncCalled: '+mkdirSyncCalled);
      assert.equal(true,mkdirSyncCalled > 0);
    });
  });
});
