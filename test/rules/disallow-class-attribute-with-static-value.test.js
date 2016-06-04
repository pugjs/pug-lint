module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowClassAttributeWithStaticValue', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowClassAttributeWithStaticValue: true});
      });

      it('should report class attribute with static value', function () {
        assert.equal(linter.checkString('a(class=\'bing\')').length, 1);
      });

      it('should not report class attribute with dynamic value', function () {
        assert.equal(linter.checkString('a(class={active: currentUrl === \'/\'})').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-class-attribute-with-static-value.pug');

        assert.equal(result.length, 5);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWCLASSATTRIBUTEWITHSTATICVALUE');
        assert.equal(result[0].line, 6);
        assert.equal(result[0].column, 22);
      });
    });
  });
}
