var assert = require('assert')
  , configFile = require('../lib/config-file')

  , fixturesPath = __dirname + '/fixtures/config-file/'

describe('configFile', function () {

  var config
    , reporter

  it('should load config file from specific dot file', function () {
    config = configFile.load(fixturesPath + 'dotfile/.jade-lintrc')

    assert.equal(config.hasOwnProperty('disallowBlockExpansion'), true, config)
  })

  it('should load config file from specified JSON file', function () {
    config = configFile.load(fixturesPath + 'json/.jade-lint.json')

    assert.equal(config.hasOwnProperty('disallowBlockExpansion'), true, config)
  })

  it('should load config from dot file in working directory', function () {
    config = configFile.load(null, fixturesPath + 'dotfile')

    assert.equal(config.hasOwnProperty('disallowBlockExpansion'), true, config)
  })

  it('should load config from JSON file in working directory', function () {
    config = configFile.load(null, fixturesPath + 'json')

    assert.equal(config.hasOwnProperty('disallowBlockExpansion'), true, config)
  })

  it('should load config from package.json in working directory', function () {
    config = configFile.load(null, fixturesPath + 'package')

    assert.equal(config.hasOwnProperty('disallowBlockExpansion'), true, config)
  })

  it('should load config from home directory if working directory is empty', function () {
    config = configFile.load(null, fixturesPath)

    assert.equal(config === undefined, true, config)
  })

  it('should return in-built reporter', function () {
    reporter = configFile.getReporter('console')

    assert.equal(reporter.writer !== null, true, reporter)
  })

  it('should return custom reporter', function () {
    reporter = configFile.getReporter(fixturesPath + 'reporter.js')

    assert.equal(reporter.writer !== null, true, reporter)
  })

  it('should return null if no in-built or custom reporter is found', function () {
    reporter = configFile.getReporter('nonexistent')

    assert.equal(reporter.writer, null, reporter)
  })

  it('should return null if no reporter is specified', function () {
    reporter = configFile.getReporter()

    assert.equal(reporter.writer, null, reporter)
  })

})
