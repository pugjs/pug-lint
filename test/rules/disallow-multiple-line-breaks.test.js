module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowMultipleLineBreaks', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ disallowMultipleLineBreaks: true })
      })

      it('should report multiple line breaks', function () {
        assert.equal(linter.checkString('div\r\r\r\ndiv').getErrorCount(), 1)
      })

      it('should not report single line breaks', function () {
        assert.equal(linter.checkString('div\rdiv\ndiv\r\ndiv').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-multiple-line-breaks.jade')

        assert.equal(result.getErrorCount(), 2)
        assert.equal(result.getError(0).code, 'JADE:LINT_DISALLOWMULTIPLELINEBREAKS')
      })

    })

  })

}
