var assert = require('assert')
  , Linter = require('../lib/linter')

describe('linter', function () {

  var linter = new Linter()
    , fixturesPath = __dirname + '/fixtures/'

  describe('configure', function () {

    it('should have no default configured rules', function () {
      linter.configure()

      assert.equal(linter.getConfiguredRules().length, 0)
    })

    it('should not use disabled rules', function () {
      linter.configure({ validateAttributeSeparator: null })

      assert.equal(linter.getConfiguredRules().length, 0)
    })

    it('should no check empty strings', function () {
      assert.equal(linter.checkString('').length, 0)
    })

  })

  describe('checkFile', function () {

    before(function () {
      linter.configure()
    })

    it('should report errors during parsing', function () {
      var result = linter.checkFile(fixturesPath + 'invalid.jade')

      assert.equal(result.length, 1)
      assert.equal(result[0].code, 'JADE:UNEXPECTED_TEXT')
    })

  })

  describe('checkPath', function () {

    before(function () {
      linter.configure()
    })

    it('should error if path does not exists', function () {
      assert.throws(function () {
        linter.checkPath('nonexistent')
      }, /Path nonexistent was not found/)
    })

    it('should report errors for file path', function () {
      var result = linter.checkPath(fixturesPath + 'invalid.jade')

      assert.equal(result.length, 1)
      assert.equal(result[0].code, 'JADE:UNEXPECTED_TEXT')
    })

    it('should report errors for directory path', function () {
      var result = linter.checkPath(fixturesPath)

      assert.equal(result.length, 2)
      assert.equal(result[0].code, 'JADE:UNEXPECTED_TEXT')
    })

  })

})
