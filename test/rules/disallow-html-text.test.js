module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath) {
	describe('disallowHtmlText', () => {
		describe('true', () => {
			before(() => {
				linter.configure({ disallowHtmlText: true });
			});

			it('should report HTML text at the start', () => {
				assert.equal(
					linter.checkString('<strong>html</strong> text').length,
					1
				);
			});

			it('should report HTML text anywhere', () => {
				assert.equal(
					linter.checkString('p this is <strong>html</strong> text')
						.length,
					1
				);
			});

			it('should not report missing HTML text', () => {
				assert.equal(linter.checkString('p this is text').length, 0);
			});

			it('should report multiple errors found in file', () => {
				const result = linter.checkFile(
					fixturesPath + 'disallow-html-text.pug'
				);

				assert.equal(result.length, 2);
				assert.equal(result[0].code, 'PUG:LINT_DISALLOWHTMLTEXT');
				assert.equal(result[0].line, 3);
				assert.equal(result[0].column, 3);
				assert.equal(result[1].line, 6);
				assert.equal(result[1].column, 3);
			});
		});
	});
}
