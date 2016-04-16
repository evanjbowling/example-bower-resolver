var fs = require('fs');
var os = require('os');
var path = require('path');

module.exports = function resolver(bower) {

  return {
    // determine whether this resolver can handle a particular "source"
    // i.e. a `bower install source` will first run this match method
    match: function (source) {
      return source.indexOf('example://apple') === 0 ||
        source.indexOf('ex://apple') === 0;
    },

    // download the bower component files
    fetch: function (endpoint, cached) {

      // 0. log inputs for clarity
      bower.logger.info('example-bower-resolver','endpoint: '+JSON.stringify(endpoint));

      // 1. create a temporary directory
      var tempDir = os.tmpdir()+path.sep+'example-bower-resolver-'+new Date().getTime();
      bower.logger.info('example-bower-resolver','created temp dir: '+tempDir);
      fs.mkdirSync(tempDir);

      // 2. populate temporary directory with component files
      if(endpoint.name === 'apple') {
        fs.writeFileSync(tempDir+path.sep+'apple.js', "console.log('log from apple.js');");
        fs.writeFileSync(tempDir+path.sep+'bower.json','{"name": "apple","description": "example bower component","main": "apple.js"}');
      }

      // 3. return expected interface
      return {
        tempPath: tempDir,
        removeIgnores: true
      };
    }
  };
};
