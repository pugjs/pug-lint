var assert = require('assert')
  , Linter = require('../../lib/linter')

describe('rules/commaSeparatedAttributes', function () {

  var linter
    , fixturesPath = __dirname + '/../fixtures/rules/'

  describe('null', function () {

    it('should be disabled if options are null', function () {
      linter = new Linter()
      linter.configure({ commaSeparatedAttributes: null })

      assert.equal(linter.getConfiguredRules().length, 0)
    })

  })

  describe('true', function () {

    before(function () {
      linter = new Linter()
      linter.configure({ commaSeparatedAttributes: true })
    })

    it('should report missing comma between attributes in string', function () {
      assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').length, 1)
    })

    it('should not report comma between attributes in string', function () {
      assert.equal(linter.checkString('input(type=\'text\', name=\'name\', value=\'value\')').length, 0)
    })

    it('should report missing comma between attributes in file', function () {
      assert.equal(linter.checkFile(fixturesPath + 'comma-separated-attributes-false.jade').length, 2)
    })

    it('should not report comma between attributes in file', function () {
      assert.equal(linter.checkFile(fixturesPath + 'comma-separated-attributes-true.jade').length, 0)
    })

  })

  describe('false', function () {

    before(function () {
      linter = new Linter()
      linter.configure({ commaSeparatedAttributes: false })
    })

    it('should report comma between attributes in string', function () {
      assert.equal(linter.checkString('input(type=\'text\', name=\'name\', value=\'value\')').length, 1)
    })

    it('should not report missing comma between attributes in string', function () {
      assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').length, 0)
    })

    it('should report comma between attributes in in file', function () {
      assert.equal(linter.checkFile(fixturesPath + 'comma-separated-attributes-true.jade').length, 2)
    })

    it('should not report missing comma between attributes in file', function () {
      assert.equal(linter.checkFile(fixturesPath + 'comma-separated-attributes-false.jade').length, 0)
    })

  })

})
