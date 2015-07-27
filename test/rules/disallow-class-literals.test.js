module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowClassLiterals', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ disallowClassLiterals: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ disallowClassLiterals: true })
      })

      it('should report class literal', function () {
        assert.equal(linter.checkString('.class').getErrorCount(), 1)
      })

      it('should not report class attribute', function () {
        assert.equal(linter.checkString('div(class=\'class\')').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-class-literals.jade')

        assert.equal(result.getErrorCount(), 3)
        assert.equal(result.getError(0).code, 'JADE:LINT_DISALLOWCLASSLITERALS')
        assert.equal(result.getError(0).line, 1)
        assert.equal(result.getError(1).line, 3)
        assert.equal(result.getError(2).line, 4)
      })

    })

  })

}
