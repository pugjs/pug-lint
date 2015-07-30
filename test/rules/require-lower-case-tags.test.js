module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('requireLowerCaseTags', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ requireLowerCaseTags: true })
      })

      it('should report mixed case tags', function () {
        assert.equal(linter.checkString('diV(class=\'class\')').length, 1)
      })

      it('should not report lower case tags', function () {
        assert.equal(linter.checkString('div(Class=\'class\')').length, 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'require-lower-case-tags.jade')

        assert.equal(result.length, 6)
        assert.equal(result[0].code, 'JADE:LINT_REQUIRELOWERCASETAGS')
      })

    })

  })

}
