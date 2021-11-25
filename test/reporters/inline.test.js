const assert = require('assert');
const sinon = require('sinon');
const reporter = require('../../lib/reporters/inline');

module.exports = createTest;

function createTest(linter) {
	describe('inline', () => {
		beforeEach(() => {
			sinon.stub(console, 'error');
		});

		afterEach(() => {
			console.error.restore();
		});

		it('should report no errors for valid string', () => {
			reporter(linter.checkString('span Text'));

			assert.equal(console.error.called, false);
		});

		it('should report errors for valid string', () => {
			reporter(linter.checkString('div: span Text'));

			assert.equal(
				console.error
					.getCall(0)
					.args[0].includes(
						'Block expansion operators must not be used'
					),
				true,
				console.error.getCall(0).args[0]
			);
			assert.equal(console.error.called, true);
		});

		it('should report multiple erros for valid string', () => {
			reporter(
				linter.checkString('div: span Text\r\r\r\ndiv: span Text')
			);

			assert.equal(
				console.error
					.getCall(0)
					.args[0].includes(
						'Block expansion operators must not be used'
					),
				true,
				console.error.getCall(0).args[0]
			);
			assert.equal(console.error.called, true);
		});
	});
}
