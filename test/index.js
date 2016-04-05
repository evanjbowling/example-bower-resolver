var assert = require('assert');
var index = require('../src/index');

describe('resolver', function() {
  var bowerMock = {

  };

  describe('#match()', function () {

    it('should return true when a valid url is passed in', function () {
      var resolver = index(bowerMock);
      //console.log("typeof resolver: "+typeof resolver);
      assert.equal(true,resolver.match("example://one"));
    });

    it('should return false when an invalid url is passed in', function () {
      var resolver = index(bowerMock);
      //console.log("typeof resolver: "+typeof resolver);
      assert.equal(false,resolver.match("svn://one"));
      assert.equal(false,resolver.match("git://one"));
      assert.equal(false,resolver.match("http://one"));
      assert.equal(false,resolver.match("https://one"));
    });
  });
});
