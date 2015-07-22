var assert = require('assert')
  , Linter = require('../lib/linter')

describe('linter', function () {

  var linter

  describe('configure', function () {

    it('should have no default configured rules', function () {
      linter = new Linter()
      linter.configure()

      assert.equal(linter.getConfiguredRules().length, 0)
    })

  })

})
