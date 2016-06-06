module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowIdAttributeWithStaticValue', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowIdAttributeWithStaticValue: true});
      });

      it('should report ID attribute with static value', function () {
        assert.equal(linter.checkString('a(id=\'bing\')').length, 1);
      });

      it('should not report ID attribute with dynamic value', function () {
        assert.equal(linter.checkString('a(id={active: currentUrl === \'/\'})').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-id-attribute-with-static-value.pug');

        assert.equal(result.length, 5);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWIDATTRIBUTEWITHSTATICVALUE');
        assert.equal(result[0].line, 6);
        assert.equal(result[0].column, 19);
      });
    });
  });
}
