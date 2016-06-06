module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('requireSpacesInsideAttributeBrackets', function () {
    describe('true', function () {
      before(function () {
        linter.configure({requireSpacesInsideAttributeBrackets: true});
      });

      it('should report missing spaces inside attribute brackets', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' checked)').length, 2);
      });

      it('should not report spaces inside attribute brackets', function () {
        assert.equal(linter.checkString('input(  type=\'text\' name=\'name\' checked )').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'require-spaces-inside-attribute-brackets.pug');

        assert.equal(result.length, 12);
        assert.equal(result[0].code, 'PUG:LINT_REQUIRESPACESINSIDEATTRIBUTEBRACKETS');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 7);
        assert.equal(result[6].line, 1);
        assert.equal(result[6].column, 38);
      });
    });
  });
}
