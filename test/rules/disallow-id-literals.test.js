module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowIdLiterals', () => {
    describe('true', () => {
      before(() => {
        linter.configure({disallowIdLiterals: true});
      });

      it('should report ID literal', () => {
        assert.equal(linter.checkString('#id').length, 1);
      });

      it('should not report ID attribute', () => {
        assert.equal(linter.checkString('div(id=\'id\')').length, 0);
      });

      it('should report multiple errors found in file', () => {
        const result = linter.checkFile(fixturesPath + 'disallow-id-literals.pug');

        assert.equal(result.length, 3);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWIDLITERALS');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 4);
        assert.equal(result[1].line, 3);
        assert.equal(result[2].line, 4);
      });
    });
  });
}
