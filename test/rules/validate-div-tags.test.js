module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath) {
	describe('validateDivTags', () => {
		describe('true', () => {
			before(() => {
				linter.configure({ validateDivTags: true });
			});

			it('should report unnecessary div tags', () => {
				assert.equal(linter.checkString('div.class').length, 1);
			});

			it('should not report needed div tags', () => {
				assert.equal(
					linter.checkString("div(class='class')").length,
					0
				);
			});

			it('should report multiple errors found in HTML file', () => {
				const result = linter.checkFile(
					fixturesPath + 'validate-div-tags--html.pug'
				);

				assert.equal(result.length, 3);
				assert.equal(result[0].code, 'PUG:LINT_VALIDATEDIVTAGS');
				assert.equal(result[0].line, 8);
				assert.equal(result[0].column, 1);
				assert.equal(result[1].line, 9);
				assert.equal(result[2].line, 10);
			});

			it('should not report any errors in XML file', () => {
				const result = linter.checkFile(
					fixturesPath + 'validate-div-tags--xml.pug'
				);

				assert.equal(result.length, 0);
			});
		});
	});
}
