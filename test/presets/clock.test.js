module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('clock', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ preset: 'clock' })

        assert.equal(linter.getConfiguredRules().length, 19)
      })

      it('should report errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'clock--invalid.jade')

        assert.equal(result.length, 2)
      })

      it('should not report errors in valid file', function () {
        var result = linter.checkFile(fixturesPath + 'clock--valid.jade')

        assert.equal(result.length, 0)
      })

    })

  })

}
