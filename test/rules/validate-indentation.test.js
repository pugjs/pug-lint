module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('validateIndentation', function () {

    describe('mixed', function () {

      before(function () {
        linter.configure({ validateIndentation: 2 })
      })

      it('should report mixed indentation as a parse error', function () {
        var result = linter.checkString('div\n  div\n\tdiv')

        assert.equal(result.getErrorCount(), 1)
        assert.equal(result.getError(0).code, 'JADE:INVALID_INDENTATION')
      })

    })

    describe('spaces', function () {

      before(function () {
        linter.configure({ validateIndentation: 2 })
      })

      it('should report invalid indentation', function () {
        assert.equal(linter.checkString('div\n\tdiv\n\t\tdiv').getErrorCount(), 2)
      })

      it('should not report valid indentation', function () {
        assert.equal(linter.checkString('div\n  div').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'validate-indentation--spaces.jade')

        assert.equal(result.getErrorCount(), 1)
        assert.equal(result.getError(0).code, 'JADE:LINT_VALIDATEINDENTATION')
        assert.equal(result.getError(0).line, 9)
      })

    })

    describe('tabs', function () {

      before(function () {
        linter.configure({ validateIndentation: '\t' })
      })

      it('should report invalid indentation', function () {
        assert.equal(linter.checkString('div\n  div\n      div').getErrorCount(), 2)
      })

      it('should not report valid indentation', function () {
        assert.equal(linter.checkString('div\n\tdiv').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'validate-indentation--tabs.jade')

        assert.equal(result.getErrorCount(), 1)
        assert.equal(result.getError(0).code, 'JADE:LINT_VALIDATEINDENTATION')
        assert.equal(result.getError(0).line, 9)
      })

    })

  })

}
