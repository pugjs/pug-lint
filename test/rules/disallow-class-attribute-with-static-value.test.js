module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowClassAttributeWithStaticValue', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ disallowClassAttributeWithStaticValue: true })
      })

      // it('should report block expansion operator', function () {
      //   assert.equal(linter.checkString('p: strong text').getErrorCount(), 1)
      // })

      // it('should report tag multiple block expansion operators', function () {
      //   assert.equal(linter.checkString('table: tr: td text').getErrorCount(), 2)
      // })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-class-attribute-with-static-value.jade')

        assert.equal(result.getErrorCount(), 4)
        assert.equal(result.getError(0).code, 'JADE:LINT_DISALLOWCLASSATTRIBUTEWITHSTATICVALUE')
      })

    })

  })

}
