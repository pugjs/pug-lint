module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('requireClassLiteralsBeforeIdLiterals', () => {
    describe('true', () => {
      before(() => {
        linter.configure({requireClassLiteralsBeforeIdLiterals: true});
      });

      it('should report ID literals before class literals', () => {
        assert.equal(linter.checkString('input(type=\'text\')#id.class').length, 1);
      });

      it('should not report class literals before ID literals', () => {
        assert.equal(linter.checkString('input.class#id(type=\'text\')').length, 0);
      });

      it('should report multiple errors found in file', () => {
        const result = linter.checkFile(fixturesPath + 'require-class-literals-before-id-literals.pug');

        assert.equal(result.length, 1);
        assert.equal(result[0].code, 'PUG:LINT_REQUIRECLASSLITERALSBEFOREIDLITERALS');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 4);
      });
    });
  });
}
