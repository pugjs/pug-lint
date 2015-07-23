module.exports = createTest

var assert = require('assert')

function createTest(linter) {

  describe('literalsBeforeAttributes', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ literalsBeforeAttributes: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('require', function () {

      before(function () {
        linter.configure({ literalsBeforeAttributes: 'require' })
      })

      it('should report attributes before literals', function () {
        assert.equal(linter.checkString('input(type=\'text\')#id.class').getErrorCount(), 1)
      })

      it('should not report literals before attributes', function () {
        assert.equal(linter.checkString('input#id.class(type=\'text\')').getErrorCount(), 0)
      })

    })

    describe('disallow', function () {

      before(function () {
        linter.configure({ literalsBeforeAttributes: 'disallow' })
      })

      it('should report literals before attributes', function () {
        assert.equal(linter.checkString('input#id.class(type=\'text\')').getErrorCount(), 1)
      })

      it('should not report attributes before literals', function () {
        assert.equal(linter.checkString('input(type=\'text\')#id.class').getErrorCount(), 0)
      })

    })

  })

}
