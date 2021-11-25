const assert = require('assert');
const path = require('path');
const Linter = require('../lib/linter');

describe('linter', () => {
	const linter = new Linter();
	const fixturesPath = path.join(__dirname, 'fixtures/');

	describe('configure', () => {
		it('should have no default configured rules', () => {
			linter.configure();

			assert.equal(linter.getConfiguredRules().length, 0);
		});

		it('should load extended config file by path', () => {
			linter.configure({
				extends: fixturesPath + 'config-file/json/.pug-lintrc.json'
			});

			assert.equal(linter.getConfiguredRules().length > 0, true);
		});

		it('should load extended config file by module name', () => {
			linter.configure({
				extends: 'pug-lint-config-clock',
				validateSelfClosingTags: null
			});

			assert.equal(linter.getConfiguredRules().length > 0, true);
		});

		it('should load extended config file by module short name', () => {
			linter.configure({
				extends: 'clock',
				validateSelfClosingTags: null
			});

			assert.equal(linter.getConfiguredRules().length > 0, true);
		});

		it('should error for invalid extended config file by path', () => {
			assert.throws(() => {
				linter.configure({ extends: fixturesPath + 'nonexistent' });
			}, /Cannot find configuration file ".*nonexistent" to extend/);
		});

		it('should error for invalid extended config file by module name', () => {
			assert.throws(() => {
				linter.configure({ extends: 'path\\dir\\nonexistent' });
			}, /Cannot find module "pug-lint-config-.*nonexistent" to extend/);
		});

		it('should error for used of deprecated preset functionality', () => {
			assert.throws(() => {
				linter.configure({ preset: 'clock' });
			}, /Presets have been deprecated/);
		});

		it('should load additional user defined rules', () => {
			linter.configure({
				additionalRules: [fixturesPath + 'config-file/rule-*.js'],
				additionalRuleA: true,
				additionalRuleB: true
			});

			assert.equal(linter.getConfiguredRules().length, 2);
		});

		it('should load additional user defined rules along side extended config file', () => {
			linter.configure({
				extends: 'clock',
				additionalRules: [fixturesPath + 'config-file/rule-*.js'],
				additionalRuleA: true,
				additionalRuleB: true
			});

			assert.equal(linter.getConfiguredRules().length > 2, true);
		});

		it('should not use disabled rules', () => {
			linter.configure({ validateAttributeSeparator: null });

			assert.equal(linter.getConfiguredRules().length, 0);
		});

		it('should not use contradictory rules', () => {
			linter.configure({
				disallowClassLiteralsBeforeAttributes: true,
				requireClassLiteralsBeforeAttributes: true
			});

			assert.equal(linter.getConfiguredRules().length, 1);
		});

		it('should no check empty strings', () => {
			assert.equal(linter.checkString('').length, 0);
		});
	});

	describe('checkFile', () => {
		before(() => {
			linter.configure();
		});

		it('should report errors during parsing', () => {
			const result = linter.checkFile(fixturesPath + 'invalid.pug');

			assert.equal(result.length, 1);
			assert.equal(result[0].code, 'PUG:SYNTAX_ERROR');
		});
	});

	describe('checkPath', () => {
		before(() => {
			linter.configure();
		});

		it('should error if path does not exists', () => {
			assert.throws(() => {
				linter.checkPath('nonexistent');
			}, /Path nonexistent was not found/);
		});

		it('should report errors for file path', () => {
			const result = linter.checkPath(fixturesPath + 'invalid.pug');

			assert.equal(result.length, 1);
			assert.equal(result[0].code, 'PUG:SYNTAX_ERROR');
		});

		it('should report errors for directory path', () => {
			const result = linter.checkPath(fixturesPath);

			assert.equal(result.length, 2);
			assert.equal(result[0].code, 'PUG:SYNTAX_ERROR');
		});

		it('should not report errors for default excluded directory path', () => {
			linter.configure({ extends: 'clock' });
			assert.equal(
				linter.checkPath(path.join(__dirname, '../node_modules'))
					.length,
				0
			);
		});

		it('should not report errors for user defined excluded directory path', () => {
			linter.configure({
				extends: 'clock',
				excludeFiles: ['node_modules/**', 'test/**']
			});
			assert.equal(
				linter.checkPath(path.join(__dirname, '..')).length,
				0
			);
		});
	});
});
