module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('commaSeparatedAttributes', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ commaSeparatedAttributes: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('require', function () {

      before(function () {
        linter.configure({ commaSeparatedAttributes: 'require' })
      })

      it('should report missing comma between attributes in string', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').length, 1)
      })

      it('should not report comma between attributes in string', function () {
        assert.equal(linter.checkString('input(type=\'text\', name=\'name\', value=\'value\')').length, 0)
      })

      it('should report missing comma between attributes in file', function () {
        assert.equal(linter.checkFile(fixturesPath + 'comma-separated-attributes-disallow.jade').length, 2)
      })

      it('should not report comma between attributes in file', function () {
        assert.equal(linter.checkFile(fixturesPath + 'comma-separated-attributes-require.jade').length, 0)
      })

    })

    describe('disallow', function () {

      before(function () {
        linter.configure({ commaSeparatedAttributes: 'disallow' })
      })

      it('should report comma between attributes in string', function () {
        assert.equal(linter.checkString('input(type=\'text\', name=\'name\', value=\'value\')').length, 1)
      })

      it('should not report missing comma between attributes in string', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').length, 0)
      })

      it('should report comma between attributes in in file', function () {
        assert.equal(linter.checkFile(fixturesPath + 'comma-separated-attributes-require.jade').length, 2)
      })

      it('should not report missing comma between attributes in file', function () {
        assert.equal(linter.checkFile(fixturesPath + 'comma-separated-attributes-disallow.jade').length, 0)
      })

    })

  })

}
