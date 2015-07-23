module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowBlockExpansion', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ disallowBlockExpansion: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ disallowBlockExpansion: true })
      })

      it('should report block expansion operator', function () {
        assert.equal(linter.checkString('p: strong text').getErrorCount(), 1)
      })

      it('should report tag multiple block expansion operators', function () {
        assert.equal(linter.checkString('table: tr: td text').getErrorCount(), 2)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-block-expansion.jade')

        assert.equal(result.getErrorCount(), 6)
        assert.equal(result.getError(0).line, 4)
        assert.equal(result.getError(1).line, 6)
        assert.equal(result.getError(2).line, 6)
        assert.equal(result.getError(3).line, 8)
        assert.equal(result.getError(4).line, 8)
        assert.equal(result.getError(5).line, 8)
      })

    })

  })

}
