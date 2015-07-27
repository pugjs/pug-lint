module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowIdLiterals', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ disallowIdLiterals: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ disallowIdLiterals: true })
      })

      it('should report ID literal', function () {
        assert.equal(linter.checkString('#id').getErrorCount(), 1)
      })

      it('should not report ID attribute', function () {
        assert.equal(linter.checkString('div(id=\'id\')').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-id-literals.jade')

        assert.equal(result.getErrorCount(), 3)
        assert.equal(result.getError(0).code, 'JADE:LINT_DISALLOWIDLITERALS')
        assert.equal(result.getError(0).line, 1)
        assert.equal(result.getError(1).line, 3)
        assert.equal(result.getError(2).line, 4)
      })

    })

  })

}
