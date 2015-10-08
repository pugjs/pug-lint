module.exports = createTest

var assert = require('assert')

function createTest (linter, fixturesPath) {

  describe('disallowAttributeConcatenation', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ disallowAttributeConcatenation: true })
      })

      it('should report attribute concatenation', function () {
        assert.equal(linter.checkString('a(href=\'text \' + title) Link').length, 1)
      })

      it('should not report attribute interpolation', function () {
        assert.equal(linter.checkString('a(href=\'#{title}\') Link').length, 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-attribute-concatenation.jade')

        assert.equal(result.length, 3)
        assert.equal(result[0].code, 'JADE:LINT_DISALLOWATTRIBUTECONCATENATION')
        assert.equal(result[0].line, 13)
      })

    })

  })

}
