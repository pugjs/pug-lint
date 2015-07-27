module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('requireClassLiteralsBeforeAttributes', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ requireClassLiteralsBeforeAttributes: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ requireClassLiteralsBeforeAttributes: true })
      })

      it('should report attributes before class literals', function () {
        assert.equal(linter.checkString('input(type=\'text\')#id.class').getErrorCount(), 1)
      })

      it('should not report class literals before attributes', function () {
        assert.equal(linter.checkString('input#id.class(type=\'text\')').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'require-class-literals-before-attributes.jade')

        assert.equal(result.getErrorCount(), 2)
        assert.equal(result.getError(0).rule, 'requireClassLiteralsBeforeAttributes')
      })

    })

  })

}
