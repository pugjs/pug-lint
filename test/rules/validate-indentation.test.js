module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('validateIndentation', () => {
    describe('mixed', () => {
      before(() => {
        linter.configure({validateIndentation: 2});
      });

      it('should report mixed indentation as a parse error', () => {
        const result = linter.checkString('div\n  div\n\tdiv');

        assert.equal(result.length, 1);
        assert.equal(result[0].code, 'PUG:INVALID_INDENTATION');
      });
    });

    describe('spaces', () => {
      before(() => {
        linter.configure({validateIndentation: 2});
      });

      it('should report invalid indentation', () => {
        assert.equal(linter.checkString('div\n\tdiv\n\t\tdiv').length, 2);
      });

      it('should not report valid indentation', () => {
        assert.equal(linter.checkString('div\n  div').length, 0);
      });

      it('should report multiple errors found in file', () => {
        const result = linter.checkFile(fixturesPath + 'validate-indentation--spaces.pug');

        assert.equal(result.length, 1);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATEINDENTATION');
        assert.equal(result[0].line, 9);
        assert.equal(result[0].column, 1);
      });
    });

    describe('tabs', () => {
      before(() => {
        linter.configure({validateIndentation: '\t'});
      });

      it('should report invalid indentation', () => {
        assert.equal(linter.checkString('div\n  div\n      div').length, 2);
      });

      it('should not report valid indentation', () => {
        assert.equal(linter.checkString('div\n\tdiv').length, 0);
      });

      it('should report multiple errors found in file', () => {
        const result = linter.checkFile(fixturesPath + 'validate-indentation--tabs.pug');

        assert.equal(result.length, 1);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATEINDENTATION');
        assert.equal(result[0].line, 9);
        assert.equal(result[0].column, 1);
      });
    });
  });
}
