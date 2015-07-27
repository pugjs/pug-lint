module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowStringInterpolation', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ disallowStringInterpolation: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ disallowStringInterpolation: true })
      })

      it('should report string interpolation', function () {
        assert.equal(linter.checkString('h1 #{title} text').getErrorCount(), 1)
      })

      it('should not report string concatenation', function () {
        assert.equal(linter.checkString('h1= title + \'text\'').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-string-interpolation.jade')

        assert.equal(result.getErrorCount(), 8)
        assert.equal(result.getError(0).code, 'JADE:LINT_DISALLOWSTRINGINTERPOLATION')
        assert.equal(result.getError(0).line, 6)
      })

    })

  })

}
