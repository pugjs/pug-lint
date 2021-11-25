module.exports = createTest;

const assert = require('assert');

function createTest(linter) {
	describe('validateLineBreaks', () => {
		describe('CR', () => {
			before(() => {
				linter.configure({ validateLineBreaks: 'CR' });
			});

			it('should not validate strings with less than two lines', () => {
				assert.equal(linter.checkString('div').length, 0);
			});

			it('should report invalid line breaks', () => {
				assert.equal(linter.checkString('div\r\ndiv').length, 1);
			});

			it('should not report valid line breaks', () => {
				assert.equal(linter.checkString('div\rdiv').length, 0);
			});
		});

		describe('LF', () => {
			before(() => {
				linter.configure({ validateLineBreaks: 'LF' });
			});

			it('should report invalid line breaks', () => {
				assert.equal(linter.checkString('div\r\ndiv').length, 1);
			});

			it('should not report valid line breaks', () => {
				assert.equal(linter.checkString('div\ndiv').length, 0);
			});
		});

		describe('CRLF', () => {
			before(() => {
				linter.configure({ validateLineBreaks: 'CRLF' });
			});

			it('should report invalid line breaks', () => {
				assert.equal(linter.checkString('div\rdiv').length, 1);
			});

			it('should not report valid line breaks', () => {
				assert.equal(linter.checkString('div\r\ndiv').length, 0);
			});
		});
	});
}
