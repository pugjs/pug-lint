var glob = require('glob')
  , Linter = require('../lib/linter')

describe('rules', function () {

  var linter = new Linter()
    , rules = []
    , fixturesPath = __dirname + '/fixtures/rules/'

  glob.sync(__dirname + '/rules/*.test.js').forEach(function (file) {
    rules.push(require(file))
  })

  rules.forEach(function (rule) {
    rule(linter, fixturesPath)
  })

})
