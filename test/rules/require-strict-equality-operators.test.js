module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('requireStrictEqualityOperators', function () {
    describe('true', function () {
      before(function () {
        linter.configure({requireStrictEqualityOperators: true});
      });

      it('should report non-strict equality operator', function () {
        assert.equal(linter.checkString('if true == false').length, 1);
      });

      it('should not report strict equality operator', function () {
        assert.equal(linter.checkString('if true === false').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'require-strict-equality-operators.pug');

        assert.equal(result.length, 4);
        assert.equal(result[0].code, 'PUG:LINT_REQUIRESTRICTEQUALITYOPERATORS');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 8);
        assert.equal(result[1].line, 3);
        assert.equal(result[2].line, 8);
        assert.equal(result[3].line, 10);
      });
    });
  });
}
