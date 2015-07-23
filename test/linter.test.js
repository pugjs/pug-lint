var assert = require('assert')
  , Linter = require('../lib/linter')

describe('linter', function () {

  var linter
    , fixturesPath = __dirname + '/fixtures/'

  describe('configure', function () {

    it('should have no default configured rules', function () {
      linter = new Linter()
      linter.configure()

      assert.equal(linter.getConfiguredRules().length, 0)
    })

    it('should report errors during parsing', function () {
      linter = new Linter()
      linter.configure()

      var result = linter.checkFile(fixturesPath + 'invalid.jade')

      assert.equal(result.getErrorCount(), 1)
      assert.equal(result.getError(0).rule, 'parseError')
    })

  })

})
