module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowDuplicateAttributes', () => {
    describe('true', () => {
      before(() => {
        linter.configure({disallowDuplicateAttributes: true});
      });

      it('should report duplicate attributes', () => {
        assert.equal(linter.checkString('div(a=\'a\' A=\'b\')').length, 1);
      });

      it('should report duplicate ID attributes', () => {
        assert.equal(linter.checkString('#id(class=\'class\' id=\'id\')').length, 1);
      });

      it('should not report duplicate class attributes', () => {
        assert.equal(linter.checkString('.class(Class=\'class\' class=\'class\')').length, 0);
      });

      it('should report multiple errors found in file', () => {
        const result = linter.checkFile(fixturesPath + 'disallow-duplicate-attributes.pug');

        assert.equal(result.length, 3);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWDUPLICATEATTRIBUTES');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 12);
      });
    });
  });
}
