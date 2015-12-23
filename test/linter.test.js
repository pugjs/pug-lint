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

    it('should load configured rules for a preset', function () {
      linter.configure({ preset: 'clock', validateSelfClosingTags: null })

      assert.equal(linter.getConfiguredRules().length > 0, true)
    })

    it('should error for invalid preset', function () {
      assert.throws(function () {
        linter.configure({ preset: 'nonexistent' })
      }, /Preset "nonexistent" does not exist/)
    })

    it('should load additional user defined rules', function () {
      linter.configure(
        { additionalRules: [ fixturesPath + 'config-file/rule-*.js' ]
        , additionalRuleA: true
        , additionalRuleB: true
        }
      )

      assert.equal(linter.getConfiguredRules().length, 2)
    })

    it('should load additional user defined rules along side preset', function () {
      linter.configure(
        { preset: 'clock'
        , additionalRules: [ fixturesPath + 'config-file/rule-*.js' ]
        , additionalRuleA: true
        , additionalRuleB: true
        }
      )

      assert.equal(linter.getConfiguredRules().length > 2, true)
    })

    it('should not use disabled rules', function () {
      linter.configure({ validateAttributeSeparator: null })

      assert.equal(linter.getConfiguredRules().length, 0)
    })

    it('should not use contradictory rules', function () {
      linter.configure(
        { disallowSpaceAfterCodeOperator: true
        , requireSpaceAfterCodeOperator: true }
      )

      assert.equal(linter.getConfiguredRules().length, 1)
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
      assert.equal(result[0].code, 'PUG:UNEXPECTED_TEXT')
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
      assert.equal(result[0].code, 'PUG:UNEXPECTED_TEXT')
    })

    it('should report errors for directory path', function () {
      var result = linter.checkPath(fixturesPath)

      assert.equal(result.length, 2)
      assert.equal(result[0].code, 'PUG:UNEXPECTED_TEXT')
    })

    it('should not report errors for default excluded directory path', function () {
      linter.configure({ 'preset': 'clock' })
      assert.equal(linter.checkPath(__dirname + '/../node_modules').length, 0)
    })

    it('should not report errors for user defined excluded directory path', function () {
      linter.configure(
        { preset: 'clock'
        , excludeFiles:
          [ 'node_modules/**'
          , 'test/**'
          ]
        }
      )
      assert.equal(linter.checkPath(__dirname + '/..').length, 0)
    })

  })

})
