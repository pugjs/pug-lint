module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowClassLiteralsBeforeIdLiterals', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ disallowClassLiteralsBeforeIdLiterals: true })
      })

      it('should report class literals before ID literals', function () {
        assert.equal(linter.checkString('input.class#id(type=\'text\')').getErrorCount(), 1)
      })

      it('should not report ID literals before class literals', function () {
        assert.equal(linter.checkString('input(type=\'text\')#id.class').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-class-literals-before-id-literals.jade')

        assert.equal(result.getErrorCount(), 2)
        assert.equal(result.getError(0).code, 'JADE:LINT_DISALLOWCLASSLITERALSBEFOREIDLITERALS')
      })

    })

  })

}
