var assert = require('assert');
var package = require('../package.json');

// tests for the package.json file to comply with bower requirements
describe('package.json', function() {

  it('should contain the exact keyword "bower-resolver"', function () {
    assert.equal(true,package.keywords.indexOf("bower-resolver") != -1);
  });

  it('should NOT list bower in dependencies', function () {
    if(package.dependencies) {
      assert.equal(false,package.dependencies.hasOwnProperty("bower"))
    }
  });

  it('should NOT list bower in peerDependencies', function () {
    if(package.peerDependencies) {
      assert.equal(false,package.peerDependencies.hasOwnProperty("bower"))
    }
  });

});
