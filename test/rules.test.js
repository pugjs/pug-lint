var glob = require('glob')
  , Linter = require('../lib/linter')

describe('rules', function () {

  var linter = new Linter()
    , tests = []
    , fixturesPath = __dirname + '/fixtures/rules/'

  glob.sync(__dirname + '/rules/*.test.js').forEach(function (file) {
    tests.push(require(file))
  })

  tests.forEach(function (test) {
    test(linter, fixturesPath)
  })

})
