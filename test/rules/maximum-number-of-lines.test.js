module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('maximumNumberOfLines', function () {

    describe('int', function () {

      before(function () {
        linter.configure({ maximumNumberOfLines: 3 })
      })

      it('should report excessive number of lines', function () {
        assert.equal(linter.checkString('p\r\np\r\np\r\n').getErrorCount(), 1)
      })

      it('should not report correct number of lines', function () {
        assert.equal(linter.checkString('p\r\np\r\n').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'maximum-number-of-lines.jade')

        assert.equal(result.getErrorCount(), 1)
        assert.equal(result.getError(0).code, 'JADE:LINT_MAXIMUMNUMBEROFLINES')
      })

    })

  })

}
