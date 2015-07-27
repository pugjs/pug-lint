module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('requireClassLiteralsBeforeIdLiterals', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ requireClassLiteralsBeforeIdLiterals: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ requireClassLiteralsBeforeIdLiterals: true })
      })

      it('should report ID literals before class literals', function () {
        assert.equal(linter.checkString('input(type=\'text\')#id.class').getErrorCount(), 1)
      })

      it('should not report class literals before ID literals', function () {
        assert.equal(linter.checkString('input.class#id(type=\'text\')').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'require-class-literals-before-id-literals.jade')

        assert.equal(result.getErrorCount(), 1)
        assert.equal(result.getError(0).rule, 'requireClassLiteralsBeforeIdLiterals')
      })

    })

  })

}
