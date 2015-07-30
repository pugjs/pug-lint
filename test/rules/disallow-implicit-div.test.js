module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowImplicitDiv', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ disallowImplicitDiv: true })
      })

      it('should report implicit div', function () {
        assert.equal(linter.checkString('div.class').length, 1)
      })

      it('should not report explicit div', function () {
        assert.equal(linter.checkString('div(class=\'class\')').length, 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-implicit-div.jade')

        assert.equal(result.length, 3)
        assert.equal(result[0].code, 'JADE:LINT_DISALLOWIMPLICITDIV')
        assert.equal(result[0].line, 6)
        assert.equal(result[1].line, 7)
        assert.equal(result[2].line, 8)
      })

    })

  })

}
