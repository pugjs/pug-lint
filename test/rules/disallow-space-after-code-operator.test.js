module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowSpaceAfterCodeOperator', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ disallowSpaceAfterCodeOperator: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ disallowSpaceAfterCodeOperator: true })
      })

      it('should report space after unbuffered operator', function () {
        assert.equal(linter.checkString('- This is code').getErrorCount(), 1)
      })

      it('should report space after buffered operator', function () {
        assert.equal(linter.checkString('p= \'This code is <escaped>\'').getErrorCount(), 1)
      })

      it('should report space after unbuffered operator', function () {
        assert.equal(linter.checkString('p!= \'This code is not <escaped>\'').getErrorCount(), 1)
      })

      it('should not report missing space after unbuffered operator', function () {
        assert.equal(linter.checkString('-This is code').getErrorCount(), 0)
      })

      it('should not report missing space after buffered operator', function () {
        assert.equal(linter.checkString('p=\'This code is <escaped>\'').getErrorCount(), 0)
      })

      it('should not report missing space after escaped buffered operator', function () {
        assert.equal(linter.checkString('p!=\'This code is not <escaped>\'').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-space-after-code-operator.jade')

        assert.equal(result.getErrorCount(), 6)
        assert.equal(result.getError(0).rule, 'disallowSpaceAfterCodeOperator')
      })

    })

  })

}
