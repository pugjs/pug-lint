module.exports = createTest

var assert = require('assert')

function createTest (linter, fixturesPath) {

  describe('disallowAttributeInterpolation', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ disallowAttributeInterpolation: true })
      })

      it('should report attribute interpolation', function () {
        assert.equal(linter.checkString('a(href=\'#{title}\') Link').length, 1)
      })

      it('should not report attribute concatenation', function () {
        assert.equal(linter.checkString('a(href=\'text \' + title) Link').length, 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-attribute-interpolation.pug')

        assert.equal(result.length, 2)
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWATTRIBUTEINTERPOLATION')
        assert.equal(result[0].line, 12)
        assert.equal(result[0].column, 9)
      })

    })

  })

}
