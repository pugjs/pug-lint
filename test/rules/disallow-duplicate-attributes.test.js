module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowDuplicateAttributes', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ disallowDuplicateAttributes: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('true', function () {

      before(function () {
        linter.configure({ disallowDuplicateAttributes: true })
      })

      it('should report duplicate attributes', function () {
        assert.equal(linter.checkString('div(a=\'a\' a=\'b\')').getErrorCount(), 1)
      })

      it('should report duplicate ID attributes', function () {
        assert.equal(linter.checkString('#id(class=\'class\' id=\'id\')').getErrorCount(), 1)
      })

      it('should not report duplicate class attributes', function () {
        assert.equal(linter.checkString('.class(class=\'class\' class=\'class\')').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-duplicate-attributes.jade')

        assert.equal(result.getErrorCount(), 3)
        assert.equal(result.getError(0).code, 'JADE:LINT_DISALLOWDUPLICATEATTRIBUTES')

      })

    })

  })

}
