var assert = require('assert');
var path = require('path');
var Linter = require('../lib/linter');

describe('linter', function () {
  var linter = new Linter();
  var fixturesPath = path.join(__dirname, 'fixtures/');

  describe('configure', function () {
    it('should have no default configured rules', function () {
      linter.configure();

      assert.equal(linter.getConfiguredRules().length, 0);
    });

    it('should load extended config file by path', function () {
      linter.configure({extends: fixturesPath + 'config-file/json/.pug-lintrc.json'});

      assert.equal(linter.getConfiguredRules().length > 0, true);
    });

    it('should load extended config file by module name', function () {
      linter.configure({extends: 'pug-lint-config-clock', validateSelfClosingTags: null});

      assert.equal(linter.getConfiguredRules().length > 0, true);
    });

    it('should load extended config file by module short name', function () {
      linter.configure({extends: 'clock', validateSelfClosingTags: null});

      assert.equal(linter.getConfiguredRules().length > 0, true);
    });

    it('should error for invalid extended config file by path', function () {
      assert.throws(function () {
        linter.configure({extends: fixturesPath + 'nonexistent'});
      }, /Cannot find configuration file ".*nonexistent" to extend/);
    });

    it('should error for invalid extended config file by module name', function () {
      assert.throws(function () {
        linter.configure({extends: 'C:\\path\\dir\\nonexistent'});
      }, /Cannot find module "pug-lint-config-.*nonexistent" to extend/);
    });

    it('should error for used of deprecated preset functionality', function () {
      assert.throws(function () {
        linter.configure({preset: 'clock'});
      }, /Presets have been deprecated/);
    });

    it('should load additional user defined rules', function () {
      linter.configure({
        additionalRules: [fixturesPath + 'config-file/rule-*.js'],
        additionalRuleA: true,
        additionalRuleB: true
      });

      assert.equal(linter.getConfiguredRules().length, 2);
    });

    it('should load additional user defined rules along side extended config file', function () {
      linter.configure({
        extends: 'clock',
        additionalRules: [fixturesPath + 'config-file/rule-*.js'],
        additionalRuleA: true,
        additionalRuleB: true
      });

      assert.equal(linter.getConfiguredRules().length > 2, true);
    });

    it('should not use disabled rules', function () {
      linter.configure({validateAttributeSeparator: null});

      assert.equal(linter.getConfiguredRules().length, 0);
    });

    it('should not use contradictory rules', function () {
      linter.configure({
        disallowClassLiteralsBeforeAttributes: true,
        requireClassLiteralsBeforeAttributes: true
      });

      assert.equal(linter.getConfiguredRules().length, 1);
    });

    it('should not check empty strings', function () {
      var results = linter.checkString('');
      var messages = results[0].messages;

      assert.equal(results.length, 1);
      assert.equal(results[0].filePath, 'input');
      assert.equal(results[0].errorCount, 0);
      assert.equal(results[0].warningCount, 0);
      assert.equal(messages.length, 0);
    });
  });

  describe('checkFile', function () {
    before(function () {
      linter.configure();
    });

    it('should report errors during parsing', function () {
      var results = linter.checkFile(fixturesPath + 'invalid.pug');
      var messages = results[0].messages;

      assert.equal(results.length, 1);
      assert.equal(results[0].filePath, fixturesPath + 'invalid.pug');
      assert.equal(results[0].errorCount, 1);
      assert.equal(results[0].warningCount, 0);
      assert.equal(messages.length, 1);
      assert.equal(messages[0].pugError.code, 'PUG:UNEXPECTED_TEXT');
    });
  });

  describe('checkPath', function () {
    before(function () {
      linter.configure();
    });

    it('should error if path does not exists', function () {
      assert.throws(function () {
        linter.checkPath('nonexistent');
      }, /Path nonexistent was not found/);
    });

    it('should report errors for file path', function () {
      var results = linter.checkPath(fixturesPath + 'invalid.pug');
      var messages = results[0].messages;

      assert.equal(results.length, 1);
      assert.equal(results[0].filePath, fixturesPath + 'invalid.pug');
      assert.equal(results[0].errorCount, 1);
      assert.equal(results[0].warningCount, 0);
      assert.equal(messages.length, 1);
      assert.equal(messages[0].pugError.code, 'PUG:UNEXPECTED_TEXT');
    });

    it('should report errors for directory path', function () {
      var results = linter.checkPath(fixturesPath);

      assert.equal(results.length, 43);

      for (var i = 0; i < results.length; i++) {
        if (results[i].filePath === fixturesPath + 'invalid.pug') {
          var messages = results[i].messages;

          assert.equal(results[i].errorCount, 1);
          assert.equal(results[i].warningCount, 0);
          assert.equal(messages.length, 1);
          assert.equal(messages[0].pugError.code, 'PUG:UNEXPECTED_TEXT');

          return;
        }
      }

      assert(false);
    });

    it('should not report errors for default excluded directory path', function () {
      linter.configure({extends: 'clock'});
      assert.equal(linter.checkPath(path.join(__dirname, '../node_modules')).length, 0);
    });

    it('should not report errors for user defined excluded directory path', function () {
      linter.configure({
        extends: 'clock',
        excludeFiles: [
          'node_modules/**',
          'test/**'
        ]
      });
      assert.equal(linter.checkPath(path.join(__dirname, '..')).length, 0);
    });
  });
});
