module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath) {
  const fixturePath = fixturesPath + 'disallow-specific-tags.pug';

  describe('disallowSpecificTags', () => {
    describe('string', () => {
      before(() => {
        linter.configure({disallowSpecificTags: 'B'});
      });

      it('should report disallowed tags', () => {
        assert.equal(linter.checkString('b bold text').length, 1);
      });

      it('should not report allowed tags', () => {
        assert.equal(linter.checkString('i italic text').length, 0);
      });

      it('should report multiple errors found in file', () => {
        const result = linter.checkFile(fixturePath);

        assert.equal(result.length, 2);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWSPECIFICTAGS');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 4);
      });
    });

    describe('array', () => {
      before(() => {
        linter.configure({disallowSpecificTags: ['b', 'S']});
      });

      it('should report disallowed tags', () => {
        assert.equal(linter.checkString('b bold text').length, 1);
      });

      it('should not report allowed tags', () => {
        assert.equal(linter.checkString('i italic text').length, 0);
      });

      it('should report multiple errors found in file', () => {
        const result = linter.checkFile(fixturePath);

        assert.equal(result.length, 4);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWSPECIFICTAGS');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 4);
      });
    });
  });
}
