module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowStringConcatenation', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ disallowStringConcatenation: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ disallowStringConcatenation: true })
      })

      it('should report string concatenation', function () {
        assert.equal(linter.checkString('h1= title + \'text\'').getErrorCount(), 1)
      })

      it('should not report string interpolation', function () {
        assert.equal(linter.checkString('h1 #{title} text').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-string-concatenation.jade')

        assert.equal(result.getErrorCount(), 5)
        assert.equal(result.getError(0).code, 'JADE:LINT_DISALLOWSTRINGCONCATENATION')
        assert.equal(result.getError(0).line, 7)
      })

    })

  })

}
