module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowTagInterpolation', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ disallowTagInterpolation: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ disallowTagInterpolation: true })
      })

      it('should report tag interpolation at the start', function () {
        assert.equal(linter.checkString('| #[strong html] text').getErrorCount(), 1)
      })

      it('should report tag interpolation anywhere', function () {
        assert.equal(linter.checkString('p #[strong html] text').getErrorCount(), 1)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-tag-interpolation.jade')

        assert.equal(result.getErrorCount(), 4)
        assert.equal(result.getError(0).code, 'JADE:LINT_DISALLOWTAGINTERPOLATION')
        assert.equal(result.getError(0).line, 2)
        assert.equal(result.getError(1).line, 3)
        assert.equal(result.getError(2).line, 5)
        assert.equal(result.getError(3).line, 6)
      })

    })

  })

}
