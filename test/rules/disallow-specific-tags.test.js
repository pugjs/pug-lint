module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  var fixturePath = fixturesPath + 'disallow-specific-tags.jade'

  describe('disallowSpecificTags', function () {

    describe('string', function () {

      before(function () {
        linter.configure({ disallowSpecificTags: 'B' })
      })

      it('should report disallowed tags', function () {
        assert.equal(linter.checkString('b bold text').getErrorCount(), 1)
      })

      it('should not report allowed tags', function () {
        assert.equal(linter.checkString('i italic text').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath)

        assert.equal(result.getErrorCount(), 2)
        assert.equal(result.getError(0).code, 'JADE:LINT_DISALLOWSPECIFICTAGS')
      })

    })

    describe('array', function () {

      before(function () {
        linter.configure({ disallowSpecificTags: [ 'b', 'S' ] })
      })

      it('should report disallowed tags', function () {
        assert.equal(linter.checkString('b bold text').getErrorCount(), 1)
      })

      it('should not report allowed tags', function () {
        assert.equal(linter.checkString('i italic text').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath)

        assert.equal(result.getErrorCount(), 4)
        assert.equal(result.getError(0).code, 'JADE:LINT_DISALLOWSPECIFICTAGS')
      })

    })

  })

}
