module.exports = createTest

var assert = require('assert')

function createTest(linter) {

  describe('validateAttributeQuoteMarks', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ validateAttributeQuoteMarks: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('double', function () {

      before(function () {
        linter.configure({ validateAttributeQuoteMarks: '"' })
      })

      it('should report invalid attribute quote marks', function () {
        assert.equal(linter.checkString('input(type=\'text\' value!=value)').getErrorCount(), 1)
      })

      it('should not report valid attribute quote marks', function () {
        assert.equal(linter.checkString('input(type="text" value!=value)').getErrorCount(), 0)
      })

    })

    describe('single', function () {

      before(function () {
        linter.configure({ validateAttributeQuoteMarks: '\'' })
      })

      it('should report invalid attribute quote marks', function () {
        assert.equal(linter.checkString('input(type="text" value!=value)').getErrorCount(), 1)
      })

      it('should not report valid attribute quote marks', function () {
        assert.equal(linter.checkString('input(type=\'text\' value!=value)').getErrorCount(), 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ validateAttributeQuoteMarks: true })
      })

      it('should report inconsistent attribute quote marks', function () {
        assert.equal(linter.checkString('input(type="text" value=\'value\')').getErrorCount(), 1)
      })

      it('should not report consistent attribute quote marks', function () {
        assert.equal(linter.checkString('input(type=\'text\' value=\'value\')').getErrorCount(), 0)
      })

    })

  })

}
