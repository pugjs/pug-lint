module.exports = createTest

var assert = require('assert')

function createTest(linter) {

  describe('spaceAfterCodeOperator', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ spaceAfterCodeOperator: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('require', function () {

      before(function () {
        linter.configure({ spaceAfterCodeOperator: 'require' })
      })

      it('should report missing space after unbuffered operator', function () {
        assert.equal(linter.checkString('-This is code').getErrorCount(), 1)
      })

      it('should report missing space after buffered operator', function () {
        assert.equal(linter.checkString('p=\'This code is <escaped>\'').getErrorCount(), 1)
      })

      it('should report missing space after escaped buffered operator', function () {
        assert.equal(linter.checkString('p!=\'This code is not <escaped>\'').getErrorCount(), 1)
      })

      it('should not report space after unbuffered operator', function () {
        assert.equal(linter.checkString('- This is code').getErrorCount(), 0)
      })

      it('should not report space after buffered operator', function () {
        assert.equal(linter.checkString('p= \'This code is <escaped>\'').getErrorCount(), 0)
      })

      it('should not report space after unbuffered operator', function () {
        assert.equal(linter.checkString('p!= \'This code is not <escaped>\'').getErrorCount(), 0)
      })

    })

    describe('disallow', function () {

      before(function () {
        linter.configure({ spaceAfterCodeOperator: 'disallow' })
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

    })

  })

}
