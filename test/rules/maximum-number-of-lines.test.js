module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('maximumNumberOfLines', () => {
    describe('int', () => {
      before(() => {
        linter.configure({maximumNumberOfLines: 3});
      });

      it('should report excessive number of lines', () => {
        assert.equal(linter.checkString('p\r\np\r\np\r\n').length, 1);
      });

      it('should not report correct number of lines', () => {
        assert.equal(linter.checkString('p\r\np\r\n').length, 0);
      });

      it('should report multiple errors found in file', () => {
        const result = linter.checkFile(fixturesPath + 'maximum-number-of-lines.pug');

        assert.equal(result.length, 1);
        assert.equal(result[0].code, 'PUG:LINT_MAXIMUMNUMBEROFLINES');
        assert.equal(result[0].line, 4);
        assert.equal(result[0].column, undefined);
      });
    });
  });
}
