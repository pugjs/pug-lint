const path = require('path');
const glob = require('glob');
const Linter = require('../lib/linter');

describe('reporters', () => {
	const linter = new Linter();
	const tests = [];

	linter.configure({
		disallowBlockExpansion: true,
		disallowMultipleLineBreaks: true
	});

	for (const file of glob.sync(path.join(__dirname, 'reporters/*.test.js'))) {
		tests.push(require(file));
	}

	for (const test of tests) {
		test(linter);
	}
});
