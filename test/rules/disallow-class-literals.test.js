module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowClassLiterals', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ disallowClassLiterals: true })
      })

      it('should report class literal', function () {
        assert.equal(linter.checkString('.class').length, 1)
      })

      it('should not report class attribute', function () {
        assert.equal(linter.checkString('div(class=\'class\')').length, 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-class-literals.jade')

        assert.equal(result.length, 3)
        assert.equal(result[0].code, 'JADE:LINT_DISALLOWCLASSLITERALS')
        assert.equal(result[0].line, 1)
        assert.equal(result[1].line, 3)
        assert.equal(result[2].line, 4)
      })

    })

  })

}
