var assert = require('assert')
  , Linter = require('../lib/linter')

describe('linter', function () {

  var linter = new Linter()
    , fixturesPath = __dirname + '/fixtures/'

  describe('configure', function () {

    it('should have no default configured rules', function () {
      linter.configure()

      assert.equal(linter.getConfiguredRules().length, 0)
    })

    it('should no check empty strings', function () {
      assert.equal(linter.checkString('').getErrorCount(), 0)
    })

    it('should report errors during parsing', function () {
      var result = linter.checkFile(fixturesPath + 'invalid.jade')

      assert.equal(result.getErrorCount(), 1)
      assert.equal(result.getError(0).code, 'JADE:UNEXPECTED_TEXT')
    })

  })

})
