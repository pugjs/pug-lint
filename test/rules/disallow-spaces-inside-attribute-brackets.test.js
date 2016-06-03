module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowSpacesInsideAttributeBrackets', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowSpacesInsideAttributeBrackets: true});
      });

      it('should report spaces inside attribute brackets', function () {
        assert.equal(linter.checkString('input( type=\'text\' name=\'name\' checked )').length, 2);
      });

      it('should not report missing spaces inside attribute brackets', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' checked)').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-spaces-inside-attribute-brackets.pug');

        assert.equal(result.length, 10);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWSPACESINSIDEATTRIBUTEBRACKETS');
        assert.equal(result[0].line, 3);
        assert.equal(result[0].column, 7);
      });
    });
  });
}
