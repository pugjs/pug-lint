var glob = require('glob')
  , Linter = require('../lib/linter')

describe('presets', function () {

  var linter = new Linter()
    , tests = []
    , fixturesPath = __dirname + '/fixtures/presets/'

  glob.sync(__dirname + '/presets/*.test.js').forEach(function (file) {
    tests.push(require(file))
  })

  tests.forEach(function (test) {
    test(linter, fixturesPath)
  })

})
