var assert = require('assert');
var mock = require('mock-require');

var mkdirSyncCalled=0;
var writeFileSyncCalled=0;
// mock the 'fs' module
mock('fs', { 
  mkdirSync: function() {
    mkdirSyncCalled++;
  },
  writeFileSync : function() {
    writeFileSyncCalled++;
  }
});

var index = require('../src/index');


// tests for the resolver factory
describe('resolver', function() {
  var loggerInfoCalled;
  var mockBower = {
    logger : {
      info : function() {
        loggerInfoCalled++;
      }
    }
  };

  describe('#match()', function () {
    it('should return true when a valid url is tested', function () {
      var resolver = index(mockBower);
      assert.equal(true,resolver.match("example://apple"));
      assert.equal(true,resolver.match("ex://apple"));
    });

    it('should return false when an invalid url is tested', function () {
      var resolver = index(mockBower);

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
    var mockEndpoint;

    beforeEach(function() {
      loggerInfoCalled = 0;
      mkdirSyncCalled=0;
      writeFileSyncCalled=0;
      mockEndpoint = {
        name: 'apple',
        target:'*',
        source:'example://apple'
      };
    });

    it('should return an object in expected format', function () {
      var resolver = index(mockBower);
      var result = resolver.fetch(mockEndpoint);
      assert.equal('object',typeof result);
      assert.equal(true,result.hasOwnProperty('tempPath'));
      assert.equal(true,result.hasOwnProperty('removeIgnores'));
    });

    it('should use bower logger while fetching contents', function () {
      var resolver = index(mockBower);
      var result = resolver.fetch(mockEndpoint);
      assert.equal(true,loggerInfoCalled > 0);
    });

    it('should create temporary directory and write files for example://apples endpoint', function () {
      var resolver = index(mockBower);
      var result = resolver.fetch(mockEndpoint);
      assert.equal(true,mkdirSyncCalled > 0);
      assert.equal(true,writeFileSyncCalled > 0);
    });

    it('should create temporary directory and write files for ex://apples endpoint', function () {
      var resolver = index(mockBower);
      mockEndpoint.source='ex://apple';
      var result = resolver.fetch(mockEndpoint);
      assert.equal(true,mkdirSyncCalled > 0);
      assert.equal(true,writeFileSyncCalled > 0);
    });

    // NOTE - This should probably error out in a real resolver.
    //        However, coding for this case seemed like overkill for an example package.
    it('should only create temporary directory for unexpected endpoint', function () {
      var resolver = index(mockBower);
      mockEndpoint.name="orange";
      mockEndpoint.source="ex://orange";
      var result = resolver.fetch(mockEndpoint);
      assert.equal(true,mkdirSyncCalled > 0);
      assert.equal(true,writeFileSyncCalled === 0);
    });
  });
});
