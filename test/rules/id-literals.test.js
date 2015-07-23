module.exports = createTest

var assert = require('assert')

function createTest(linter) {

  describe('idLiterals', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ idLiterals: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('require', function () {

      before(function () {
        linter.configure({ idLiterals: 'require' })
      })

      it('should report ID attribute', function () {
        assert.equal(linter.checkString('div(id=\'id\')').getErrorCount(), 1)
      })

      it('should not report ID literal', function () {
        assert.equal(linter.checkString('#id').getErrorCount(), 0)
      })

    })

    describe('disallow', function () {

      before(function () {
        linter.configure({ idLiterals: 'disallow' })
      })

      it('should report ID literal', function () {
        assert.equal(linter.checkString('#id').getErrorCount(), 1)
      })

      it('should not report ID attribute', function () {
        assert.equal(linter.checkString('div(id=\'id\')').getErrorCount(), 0)
      })

    })

  })

}
