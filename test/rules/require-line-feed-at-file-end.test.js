module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('requireLineFeedAtFileEnd', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ requireLineFeedAtFileEnd: true })
      })

      it('should report missing line feed', function () {
        assert.equal(linter.checkString('div').getErrorCount(), 1)
      })

      it('should not report line feed', function () {
        assert.equal(linter.checkString('div\r').getErrorCount(), 0)
        assert.equal(linter.checkString('div\n').getErrorCount(), 0)
        assert.equal(linter.checkString('div\r\n').getErrorCount(), 0)
      })

      it('should report missing line feed at file end', function () {
        var result = linter.checkFile(fixturesPath + 'require-line-feed-at-file-end--missing.jade')

        assert.equal(result.getErrorCount(), 1)
        assert.equal(result.getError(0).code, 'JADE:LINT_REQUIRELINEFEEDATFILEEND')
      })

      it('should not report line feed at file end', function () {
        var result = linter.checkFile(fixturesPath + 'require-line-feed-at-file-end.jade')

        assert.equal(result.getErrorCount(), 0)
      })

    })

  })

}
