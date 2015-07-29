module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  var fixturePath = fixturesPath + 'validate-attribute-quote-marks.jade'

  describe('validateAttributeQuoteMarks', function () {

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

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath)

        assert.equal(result.getErrorCount(), 6)
        assert.equal(result.getError(0).code, 'JADE:LINT_VALIDATEATTRIBUTEQUOTEMARKS')
        assert.equal(result.getError(0).line, 1)
        assert.equal(result.getError(1).line, 1)
        assert.equal(result.getError(2).line, 1)
        assert.equal(result.getError(3).line, 2)
        assert.equal(result.getError(4).line, 2)
        assert.equal(result.getError(5).line, 4)
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

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath)

        assert.equal(result.getErrorCount(), 6)
        assert.equal(result.getError(0).code, 'JADE:LINT_VALIDATEATTRIBUTEQUOTEMARKS')
        assert.equal(result.getError(0).line, 2)
        assert.equal(result.getError(1).line, 3)
        assert.equal(result.getError(2).line, 3)
        assert.equal(result.getError(3).line, 3)
        assert.equal(result.getError(4).line, 4)
        assert.equal(result.getError(5).line, 4)
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

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath)

        assert.equal(result.getErrorCount(), 6)
        assert.equal(result.getError(0).code, 'JADE:LINT_VALIDATEATTRIBUTEQUOTEMARKS')
        assert.equal(result.getError(0).line, 2)
        assert.equal(result.getError(1).line, 3)
        assert.equal(result.getError(2).line, 3)
        assert.equal(result.getError(3).line, 3)
        assert.equal(result.getError(4).line, 4)
        assert.equal(result.getError(5).line, 4)
      })

    })

  })

}
