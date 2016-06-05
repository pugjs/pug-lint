var assert = require('assert');
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
    test(linter, fixturesPath, testSingle);
  });

  function testSingle(source, line, column) {
    var results = linter.checkString(source);
    assert.equal(results.length, line ? 1 : 0);
    if (line) {
      assert.equal(results[0].line, line);
      assert.equal(results[0].column, column);
    }
  }
});
