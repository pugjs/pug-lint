module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('requireLowerCaseAttributes', () => {
    describe('true', () => {
      before(() => {
        linter.configure({requireLowerCaseAttributes: true});
      });

      it('should report mixed case attributes', () => {
        assert.equal(linter.checkString('div(Class=\'class\')').length, 1);
      });

      it('should not report lower case attributes', () => {
        assert.equal(linter.checkString('diV(class=\'class\')').length, 0);
      });

      it('should report multiple errors found in file', () => {
        const result = linter.checkFile(fixturesPath + 'require-lower-case-attributes.pug');

        assert.equal(result.length, 3);
        assert.equal(result[0].code, 'PUG:LINT_REQUIRELOWERCASEATTRIBUTES');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 19);
      });

      it('should not report errors found in XML', () => {
        assert.equal(linter.checkString('doctype xml\ndiv(Class=\'class\')').length, 0);
      });
    });
  });
}
