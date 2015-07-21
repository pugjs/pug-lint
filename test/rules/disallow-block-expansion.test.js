module.exports = createTest

var assert = require('assert')

function createTest(linter) {

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
        assert.equal(linter.checkString('p: strong text').length, 1)
      })

      it('should report tag multiple block expansion operators', function () {
        assert.equal(linter.checkString('table: tr: td text').length, 2)
      })

    })

  })

}
