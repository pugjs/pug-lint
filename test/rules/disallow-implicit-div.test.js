module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowImplicitDiv', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ disallowImplicitDiv: true })
      })

      it('should report implicit div', function () {
        assert.equal(linter.checkString('div.class').getErrorCount(), 1)
      })

      it('should not report explicit div', function () {
        assert.equal(linter.checkString('div(class=\'class\')').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-implicit-div.jade')

        assert.equal(result.getErrorCount(), 3)
        assert.equal(result.getError(0).code, 'JADE:LINT_DISALLOWIMPLICITDIV')
        assert.equal(result.getError(0).line, 6)
        assert.equal(result.getError(1).line, 7)
        assert.equal(result.getError(2).line, 8)
      })

    })

  })

}
