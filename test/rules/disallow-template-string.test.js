module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath, test) {
	describe('disallowTemplateString', () => {
		describe('true', () => {
			before(() => {
				linter.configure({ disallowTemplateString: true });
			});

			it('should report template strings', () => {
				test('h1= `${title} text`', 1, 5);
				test('h1\n  span!= translate(`${title} text`)');
				test('= `${title} text` + `text ${translate(title)}`');
				test('!= String.raw`tagged`');
				test('- `abc`');
			});

			it('should not report attribute as template string', () => {
				test('a(href=`https://${link}`) Link');
			});

			it('should report multiple errors found in file', () => {
				const result = linter.checkFile(
					fixturesPath + 'disallow-template-string.pug'
				);

				assert.equal(result.length, 1);
				assert.equal(result[0].code, 'PUG:LINT_DISALLOWTEMPLATESTRING');
				assert.equal(result[0].line, 1);
				assert.equal(result[0].column, 5);
			});
		});

		describe('all', () => {
			before(() => {
				linter.configure({ disallowTemplateString: 'all' });
			});

			it('should report template strings', () => {
				test('h1= `${title} text`', 1, 5);
				test('h1\n  span!= translate(`${title} text`)', 2, 20);
				test('!= String.raw`tagged`', 1, 14);
				test('- `abc`');

				const result = linter.checkString(
					'= `${title} text` + `text ${translate(title)}`'
				);
				assert.equal(result.length, 2);
				assert.equal(result[0].line, 1);
				assert.equal(result[0].column, 3);
				assert.equal(result[1].line, 1);
				assert.equal(result[1].column, 21);
			});

			it('should not report attribute as template string', () => {
				test('a(href=`https://${link}`) Link');
			});

			it('should report multiple errors found in file', () => {
				const result = linter.checkFile(
					fixturesPath + 'disallow-template-string.pug'
				);

				assert.equal(result.length, 5);
				assert.equal(result[0].code, 'PUG:LINT_DISALLOWTEMPLATESTRING');
				assert.equal(result[0].line, 1);
				assert.equal(result[0].column, 5);
			});
		});
	});
}
