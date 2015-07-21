module.exports = createTest

var assert = require('assert')

function createTest(linter) {

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
        assert.equal(linter.checkString('| #[strong html] text').length, 1)
      })

      it('should report tag interpolation anywhere', function () {
        assert.equal(linter.checkString('p #[strong html] text').length, 1)
      })

      it('should not report HTML text', function () {
        assert.equal(linter.checkString('p this is <strong>html</strong> text').length, 0)
      })

    })

  })

}
