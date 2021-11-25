module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath) {
	describe('disallowClassLiteralsBeforeAttributes', () => {
		describe('true', () => {
			before(() => {
				linter.configure({
					disallowClassLiteralsBeforeAttributes: true
				});
			});

			it('should report class literals before attributes', () => {
				assert.equal(
					linter.checkString("input#id.class(type='text')").length,
					1
				);
			});

			it('should not report attributes before class literals', () => {
				assert.equal(
					linter.checkString("input(type='text')#id.class").length,
					0
				);
			});

			it('should report multiple errors found in file', () => {
				const result = linter.checkFile(
					fixturesPath +
						'disallow-class-literals-before-attributes.pug'
				);

				assert.equal(result.length, 2);
				assert.equal(
					result[0].code,
					'PUG:LINT_DISALLOWCLASSLITERALSBEFOREATTRIBUTES'
				);
				assert.equal(result[0].line, 2);
				assert.equal(result[0].column, 10);
			});
		});
	});
}
