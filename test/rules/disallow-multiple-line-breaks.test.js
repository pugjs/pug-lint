module.exports = createTest

var assert = require('assert')

function createTest (linter, fixturesPath) {

  describe('disallowMultipleLineBreaks', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ disallowMultipleLineBreaks: true })
      })

      it('should report multiple line breaks', function () {
        assert.equal(linter.checkString('div\r\r\r\ndiv').length, 1)
      })

      it('should not report single line breaks', function () {
        assert.equal(linter.checkString('div\rdiv\ndiv\r\ndiv').length, 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-multiple-line-breaks.jade')

        assert.equal(result.length, 2)
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWMULTIPLELINEBREAKS')
      })

      it.only('should not report line breaks in object-literal blocks', function () {
        var result = linter.checkFile(fixturesPath + '../misc/disallow-multiple-line-breaks-object-block.jade')
        assert.equal(result.length, 1)
      })

    })

  })

}
