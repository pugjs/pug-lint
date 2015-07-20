module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('idLiterals', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ idLiterals: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('require', function () {

      before(function () {
        linter.configure({ idLiterals: 'require' })
      })

      it('should report ID attribute in string', function () {
        assert.equal(linter.checkString('div(id=\'id-attribute\')').length, 1)
      })

      it('should not report ID literal in string', function () {
        assert.equal(linter.checkString('#id-literal').length, 0)
      })

      it('should report ID attribute in file', function () {
        assert.equal(linter.checkFile(fixturesPath + 'id-literals-disallow.jade').length, 2)
      })

      it('should not report ID literal in file', function () {
        assert.equal(linter.checkFile(fixturesPath + 'id-literals-require.jade').length, 0)
      })

    })

    describe('disallow', function () {

      before(function () {
        linter.configure({ idLiterals: 'disallow' })
      })

      it('should report ID literal in string', function () {
        assert.equal(linter.checkString('#id-literal').length, 1)
      })

      it('should not report ID attribute in string', function () {
        assert.equal(linter.checkString('div(id=\'id-attribute\')').length, 0)
      })

      it('should report ID literal in file', function () {
        assert.equal(linter.checkFile(fixturesPath + 'id-literals-require.jade').length, 2)
      })

      it('should not report ID attribute in file', function () {
        assert.equal(linter.checkFile(fixturesPath + 'id-literals-disallow.jade').length, 0)
      })

    })

  })

}
