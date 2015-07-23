module.exports = createTest

var assert = require('assert')

function createTest(linter) {

  describe('disallowHtmlText', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ disallowHtmlText: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ disallowHtmlText: true })
      })

      it('should report HTML text at the start', function () {
        assert.equal(linter.checkString('<strong>html</strong> text').getErrorCount(), 1)
      })

      it('should report HTML text anywhere', function () {
        assert.equal(linter.checkString('p this is <strong>html</strong> text').getErrorCount(), 1)
      })

    })

  })

}
