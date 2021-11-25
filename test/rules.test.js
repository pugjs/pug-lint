const assert = require('assert');
const path = require('path');
const glob = require('glob');
const Linter = require('../lib/linter');

describe('rules', () => {
	const linter = new Linter();
	const tests = [];
	const fixturesPath = path.join(__dirname, 'fixtures/rules/');

	for (const file of glob.sync(path.join(__dirname, 'rules/*.test.js'))) {
		tests.push(require(file));
	}

	for (const test of tests) {
		test(linter, fixturesPath, testSingle);
	}

	function testSingle(source, line, column) {
		const results = linter.checkString(source);
		assert.equal(results.length, line ? 1 : 0);
		if (line) {
			assert.equal(results[0].line, line);
			assert.equal(results[0].column, column);
		}
	}
});
