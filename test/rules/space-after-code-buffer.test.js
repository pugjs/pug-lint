module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('spaceAfterCodeBuffer', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ spaceAfterCodeBuffer: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('require', function () {

      before(function () {
        linter.configure({ spaceAfterCodeBuffer: 'require' })
      })

      it('should report missing space after buffer in string', function () {
        assert.equal(linter.checkString('p=\'This code is <escaped>\'').length, 1)
      })

      it('should not report space after buffer in string', function () {
        assert.equal(linter.checkString('p= \'This code is <escaped>\'').length, 0)
      })

      it('should report missing space after buffer in file', function () {
        assert.equal(linter.checkFile(fixturesPath + 'space-after-code-buffer-disallow.jade').length, 2)
      })

      it('should not report space after buffer in file', function () {
        assert.equal(linter.checkFile(fixturesPath + 'space-after-code-buffer-require.jade').length, 0)
      })

    })

    describe('disallow', function () {

      before(function () {
        linter.configure({ spaceAfterCodeBuffer: 'disallow' })
      })

      it('should report space after buffer in string', function () {
        assert.equal(linter.checkString('p= \'This code is <escaped>\'').length, 1)
      })

      it('should not report missing space after buffer in string', function () {
        assert.equal(linter.checkString('p=\'This code is <escaped>\'').length, 0)
      })

      it('should report space after buffer in in file', function () {
        assert.equal(linter.checkFile(fixturesPath + 'space-after-code-buffer-require.jade').length, 2)
      })

      it('should not report missing space after buffer in file', function () {
        assert.equal(linter.checkFile(fixturesPath + 'space-after-code-buffer-disallow.jade').length, 0)
      })

    })

  })

}
