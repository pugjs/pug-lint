module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath, test) {
	describe('disallowLegacyMixinCall', () => {
		before(() => {
			linter.configure({ disallowLegacyMixinCall: true });
		});

		it('should report legacy mixin call', () => {
			test('mixin myMixin(variable, 2)', 1, 1);
			test('div\n  mixin myMixin(variable, 2)\n  p Nay', 2, 3);
		});

		it('should not report mixin definition', () => {
			test('mixin myMixin(variable)\n  p Yay');
			test('div\n  mixin myMixin(variable)\n    p Yay');
		});

		it('should not report modern mixin call', () => {
			test('+myMixin(variable, 2)');
			test('+myMixin(variable, 2)\n  p Yay');
		});

		it('should report multiple errors found in file', () => {
			const result = linter.checkFile(
				fixturesPath + 'disallow-legacy-mixin-call.pug'
			);

			assert.equal(result.length, 2);
			assert.equal(
				result[0].code,
				'PUG:LINT_DISALLOWLEGACYMIXINCALL'
			);
			assert.equal(result[0].line, 3);
			assert.equal(result[0].column, 1);
		});
	});
}
