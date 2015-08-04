var glob = require('glob')
  , Linter = require('../lib/linter')

describe('presets', function () {

  var linter = new Linter()
    , rules = []
    , fixturesPath = __dirname + '/fixtures/presets/'

  glob.sync(__dirname + '/presets/*.test.js').forEach(function (file) {
    rules.push(require(file))
  })

  rules.forEach(function (rule) {
    rule(linter, fixturesPath)
  })

})
