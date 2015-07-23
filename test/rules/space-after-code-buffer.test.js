module.exports = createTest

var assert = require('assert')

function createTest(linter) {

  describe('spaceAfterCodeBuffer', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ spaceAfterCodeBuffer: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('require', function () {

      before(function () {
        linter.configure({ spaceAfterCodeBuffer: 'require' })
      })

      it('should report missing space after buffer', function () {
        assert.equal(linter.checkString('p=\'This code is <escaped>\'').getErrorCount(), 1)
      })

      it('should not report space after buffer', function () {
        assert.equal(linter.checkString('p= \'This code is <escaped>\'').getErrorCount(), 0)
      })

    })

    describe('disallow', function () {

      before(function () {
        linter.configure({ spaceAfterCodeBuffer: 'disallow' })
      })

      it('should report space after buffer', function () {
        assert.equal(linter.checkString('p= \'This code is <escaped>\'').getErrorCount(), 1)
      })

      it('should not report missing space after buffer', function () {
        assert.equal(linter.checkString('p=\'This code is <escaped>\'').getErrorCount(), 0)
      })

    })

  })

}
