var path = require('path');
var glob = require('glob');
var Linter = require('../lib/linter');

describe('reporters', function () {
  var linter = new Linter();
  var tests = [];

  linter.configure({
    disallowBlockExpansion: true,
    disallowMultipleLineBreaks: true
  });

  glob.sync(path.join(__dirname, 'reporters/*.test.js')).forEach(function (file) {
    tests.push(require(file));
  });

  tests.forEach(function (test) {
    test(linter);
  });
});
