module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('requireIdLiteralsBeforeAttributes', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ requireIdLiteralsBeforeAttributes: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ requireIdLiteralsBeforeAttributes: true })
      })

      it('should report attributes before ID literals', function () {
        assert.equal(linter.checkString('input(type=\'text\')#id.class').getErrorCount(), 1)
      })

      it('should not report ID literals before attributes', function () {
        assert.equal(linter.checkString('input#id.class(type=\'text\')').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'require-id-literals-before-attributes.jade')

        assert.equal(result.getErrorCount(), 2)
        assert.equal(result.getError(0).rule, 'requireIdLiteralsBeforeAttributes')
      })

    })

  })

}
