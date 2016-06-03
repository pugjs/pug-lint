var path = require('path');
var glob = require('glob');
var Linter = require('../lib/linter');

describe('rules', function () {
  var linter = new Linter();
  var tests = [];
  var fixturesPath = path.join(__dirname, 'fixtures/rules/');

  glob.sync(path.join(__dirname, 'rules/*.test.js')).forEach(function (file) {
    tests.push(require(file));
  });

  tests.forEach(function (test) {
    test(linter, fixturesPath);
  });
});
