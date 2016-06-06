module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath, test) {
  describe('disallowAttributeInterpolation', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowAttributeInterpolation: true});
      });

      it('should report attribute interpolation', function () {
        test('a(href=\'#{title}\') Link', 1, 9);
        test('a(href=\'\'\n + \'#{title}\') Link', 2, 5);
      });

      it('should not report attribute concatenation', function () {
        test('a(href=\'text \' + title) Link');
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-attribute-interpolation.pug');

        assert.equal(result.length, 2);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWATTRIBUTEINTERPOLATION');
        assert.equal(result[0].line, 12);
        assert.equal(result[0].column, 9);
      });
    });
  });
}
