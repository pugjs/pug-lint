module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('requireSpaceAfterCodeOperator', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ requireSpaceAfterCodeOperator: true })
      })

      it('should report missing space after unbuffered operator', function () {
        assert.equal(linter.checkString('-This is code').length, 1)
      })

      it('should report missing space after buffered operator', function () {
        assert.equal(linter.checkString('p=\'This code is <escaped>\'').length, 1)
      })

      it('should report missing space after escaped buffered operator', function () {
        assert.equal(linter.checkString('p!=\'This code is not <escaped>\'').length, 1)
      })

      it('should not report space after unbuffered operator', function () {
        assert.equal(linter.checkString('- This is code').length, 0)
      })

      it('should not report space after buffered operator', function () {
        assert.equal(linter.checkString('p= \'This code is <escaped>\'').length, 0)
      })

      it('should not report space after unbuffered operator', function () {
        assert.equal(linter.checkString('p!= \'This code is not <escaped>\'').length, 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'require-space-after-code-operator.jade')

        assert.equal(result.length, 16)
        assert.equal(result[0].code, 'JADE:LINT_REQUIRESPACEAFTERCODEOPERATOR')
      })

    })

  })

}
